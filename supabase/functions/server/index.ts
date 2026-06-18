import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import * as kv from "./kv_store.tsx";

const app = new Hono();
const BUCKET = "make-175d92f4-images";
const PREFIX = "/make-server-175d92f4";

// Admin secret for write operations (set in Supabase env vars)
const ADMIN_SECRET = Deno.env.get("ADMIN_SECRET") ?? "";

app.use('*', logger(console.log));
app.use("/*", cors({
  origin: ["https://dentyeco.com.br", "https://www.dentyeco.com.br", "https://code-gamma-three.vercel.app"],
  allowHeaders: ["Content-Type", "Authorization", "X-Admin-Secret"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
}));

// Middleware: validate admin — accepts either Supabase JWT or legacy admin secret
async function requireAdmin(c: any, next: any) {
  // Try Supabase JWT first
  const authHeader = c.req.header("Authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    const supabase = supabaseAdmin();
    const { data: { user } } = await supabase.auth.getUser(token);
    if (user) return next();
  }
  // Fallback: legacy admin secret
  const secret = c.req.header("X-Admin-Secret");
  if (ADMIN_SECRET && secret === ADMIN_SECRET) return next();
  return c.json({ error: "Unauthorized" }, 401);
}

// Rate limiting for leads (max 5 per IP per 10 min)
const leadAttempts = new Map<string, { count: number; reset: number }>();
function rateLimitLeads(c: any, next: any) {
  const ip = c.req.header("x-forwarded-for") ?? "unknown";
  const now = Date.now();
  const entry = leadAttempts.get(ip);
  if (entry) {
    if (now < entry.reset) {
      if (entry.count >= 5) return c.json({ error: "Too many requests" }, 429);
      entry.count++;
    } else {
      leadAttempts.set(ip, { count: 1, reset: now + 10 * 60 * 1000 });
    }
  } else {
    leadAttempts.set(ip, { count: 1, reset: now + 10 * 60 * 1000 });
  }
  return next();
}

function supabaseAdmin() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
}

// Ensure storage bucket exists on startup
async function ensureBucket() {
  const supabase = supabaseAdmin();
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some(b => b.name === BUCKET);
  if (!exists) {
    await supabase.storage.createBucket(BUCKET, { public: false });
    console.log(`Bucket ${BUCKET} created`);
  }
}
ensureBucket();

// ── Health ──────────────────────────────────────────────────────────────────
app.get(`${PREFIX}/health`, (c) => c.json({ status: "ok" }));

// ── Image Upload ────────────────────────────────────────────────────────────
app.post(`${PREFIX}/upload`, requireAdmin, async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get("file") as File;
    if (!file) return c.json({ error: "No file provided" }, 400);

    const ext = file.name.split('.').pop() || 'jpg';
    const path = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

    const supabase = supabaseAdmin();
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
      contentType: file.type,
      upsert: false,
    });
    if (error) return c.json({ error: `Upload failed: ${error.message}` }, 500);

    const { data: signed } = await supabase.storage.from(BUCKET).createSignedUrl(path, 60 * 60 * 24 * 365);
    return c.json({ url: signed?.signedUrl, path });
  } catch (err) {
    console.log("Upload error:", err);
    return c.json({ error: String(err) }, 500);
  }
});

// Refresh signed URL for a stored path
app.get(`${PREFIX}/image/:path`, async (c) => {
  try {
    const path = decodeURIComponent(c.req.param("path"));
    const supabase = supabaseAdmin();
    const { data } = await supabase.storage.from(BUCKET).createSignedUrl(path, 60 * 60 * 24);
    if (!data?.signedUrl) return c.json({ error: "Not found" }, 404);
    return c.json({ url: data.signedUrl });
  } catch (err) {
    return c.json({ error: String(err) }, 500);
  }
});

// ── Models ──────────────────────────────────────────────────────────────────
app.get(`${PREFIX}/models`, async (c) => {
  try {
    const models = await kv.get("denty_models") ?? [];
    return c.json(models);
  } catch (err) {
    console.log("Get models error:", err);
    return c.json({ error: String(err) }, 500);
  }
});

app.post(`${PREFIX}/models`, requireAdmin, async (c) => {
  try {
    const models = await c.req.json();
    await kv.set("denty_models", models);
    return c.json({ ok: true });
  } catch (err) {
    console.log("Save models error:", err);
    return c.json({ error: String(err) }, 500);
  }
});

// ── Banners ─────────────────────────────────────────────────────────────────
app.get(`${PREFIX}/banners`, async (c) => {
  try {
    const banners = await kv.get("denty_banners") ?? [];
    return c.json(banners);
  } catch (err) {
    return c.json({ error: String(err) }, 500);
  }
});

app.post(`${PREFIX}/banners`, requireAdmin, async (c) => {
  try {
    const banners = await c.req.json();
    await kv.set("denty_banners", banners);
    return c.json({ ok: true });
  } catch (err) {
    return c.json({ error: String(err) }, 500);
  }
});

// ── Leads ────────────────────────────────────────────────────────────────────
app.get(`${PREFIX}/leads`, async (c) => {
  try {
    const leads = await kv.get("denty_leads") ?? [];
    return c.json(leads);
  } catch (err) {
    return c.json({ error: String(err) }, 500);
  }
});

app.post(`${PREFIX}/leads`, rateLimitLeads, async (c) => {
  try {
    const lead = await c.req.json();
    const existing = await kv.get("denty_leads") ?? [];
    const newLead = { ...lead, id: Date.now().toString(), date: new Date().toISOString() };
    await kv.set("denty_leads", [newLead, ...existing]);
    return c.json({ ok: true, lead: newLead });
  } catch (err) {
    return c.json({ error: String(err) }, 500);
  }
});

app.delete(`${PREFIX}/leads/:id`, requireAdmin, async (c) => {
  try {
    const id = c.req.param("id");
    const existing = await kv.get("denty_leads") ?? [];
    await kv.set("denty_leads", existing.filter((l: any) => l.id !== id));
    return c.json({ ok: true });
  } catch (err) {
    return c.json({ error: String(err) }, 500);
  }
});

// ── Tracking ─────────────────────────────────────────────────────────────────
app.get(`${PREFIX}/tracking`, async (c) => {
  try {
    const config = await kv.get("denty_tracking") ?? {};
    return c.json(config);
  } catch (err) {
    return c.json({ error: String(err) }, 500);
  }
});

app.post(`${PREFIX}/tracking`, requireAdmin, async (c) => {
  try {
    const config = await c.req.json();
    await kv.set("denty_tracking", config);
    return c.json({ ok: true });
  } catch (err) {
    return c.json({ error: String(err) }, 500);
  }
});

// ── Admin User Management ────────────────────────────────────────────────────
app.get(`${PREFIX}/admin/users`, requireAdmin, async (c) => {
  try {
    const supabase = supabaseAdmin();
    const { data: { users }, error } = await supabase.auth.admin.listUsers();
    if (error) return c.json({ error: error.message }, 500);
    return c.json(users.map(u => ({ id: u.id, email: u.email, created_at: u.created_at, last_sign_in_at: u.last_sign_in_at })));
  } catch (err) {
    return c.json({ error: String(err) }, 500);
  }
});

app.post(`${PREFIX}/admin/users`, requireAdmin, async (c) => {
  try {
    const { email, password } = await c.req.json();
    if (!email || !password) return c.json({ error: "email and password required" }, 400);
    const supabase = supabaseAdmin();
    const { data, error } = await supabase.auth.admin.createUser({
      email, password, email_confirm: true,
    });
    if (error) return c.json({ error: error.message }, 500);
    return c.json({ ok: true, user: { id: data.user.id, email: data.user.email } });
  } catch (err) {
    return c.json({ error: String(err) }, 500);
  }
});

app.delete(`${PREFIX}/admin/users/:id`, requireAdmin, async (c) => {
  try {
    const id = c.req.param("id");
    const supabase = supabaseAdmin();
    const { error } = await supabase.auth.admin.deleteUser(id);
    if (error) return c.json({ error: error.message }, 500);
    return c.json({ ok: true });
  } catch (err) {
    return c.json({ error: String(err) }, 500);
  }
});

Deno.serve(app.fetch);
