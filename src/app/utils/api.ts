import { projectId, publicAnonKey } from '/utils/supabase/info';
import { supabase } from './supabaseClient';

const BASE = `https://${projectId}.supabase.co/functions/v1/make-server-175d92f4`;
const ADMIN_SECRET = 'DentyEco@Admin#2026!Secure';

async function getAuthHeaders(admin = false): Promise<Record<string, string>> {
  const base: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${publicAnonKey}`,
  };
  if (admin) {
    // Try Supabase session JWT first
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      base['Authorization'] = `Bearer ${session.access_token}`;
    } else {
      base['X-Admin-Secret'] = ADMIN_SECRET;
    }
  }
  return base;
}

async function req<T>(method: string, path: string, body?: unknown, admin = false): Promise<T> {
  const headers = await getAuthHeaders(admin);
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API ${method} ${path} failed: ${err}`);
  }
  return res.json();
}

export const api = {
  getModels: () => req<any[]>('GET', '/models'),
  saveModels: (models: any[]) => req<{ ok: boolean }>('POST', '/models', models, true),

  getBanners: () => req<any[]>('GET', '/banners'),
  saveBanners: (banners: any[]) => req<{ ok: boolean }>('POST', '/banners', banners, true),

  getLeads: () => req<any[]>('GET', '/leads', undefined, true),
  addLead: (lead: { name: string; phone: string; message: string }) =>
    req<{ ok: boolean }>('POST', '/leads', lead, false),
  deleteLead: (id: string) => req<{ ok: boolean }>('DELETE', `/leads/${id}`, undefined, true),

  getTracking: () => req<any>('GET', '/tracking'),
  saveTracking: (config: any) => req<{ ok: boolean }>('POST', '/tracking', config, true),

  // User management
  getAdminUsers: () => req<any[]>('GET', '/admin/users', undefined, true),
  createAdminUser: (email: string, password: string) =>
    req<{ ok: boolean; user: any }>('POST', '/admin/users', { email, password }, true),
  deleteAdminUser: (id: string) => req<{ ok: boolean }>('DELETE', `/admin/users/${id}`, undefined, true),

  uploadImage: async (file: File): Promise<string> => {
    const headers = await getAuthHeaders(true);
    delete headers['Content-Type'];
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(`${BASE}/upload`, { method: 'POST', headers, body: form });
    if (!res.ok) throw new Error('Image upload failed');
    const { url } = await res.json();
    return url;
  },

  uploadBase64: async (dataUrl: string, filename = 'image.jpg'): Promise<string> => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const file = new File([blob], filename, { type: blob.type });
    return api.uploadImage(file);
  },
};
