import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Plus, Edit2, Trash2, Save, X, Upload, ImageIcon, Palette, Image, GripVertical, Users, Phone, MessageCircle, Download, Tag, CheckCircle, UserPlus, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { api } from '../utils/api';

export interface ColorVariant {
  name: string;
  image: string;
}

export interface Model {
  id: string;
  name: string;
  description: string;
  detalhes?: string;
  price: string;
  power: string;
  autonomy: string;
  speed: string;
  battery: string;
  batteryType: string;
  popular: boolean;
  available: boolean;
  colors: ColorVariant[];
}

export const COLOR_MAP: Record<string, string> = {
  Preta: '#1a1a1a',
  Branca: '#ffffff',
  Vermelha: '#dc2626',
  Azul: '#2563eb',
  Cinza: '#6b7280',
  Verde: '#16a34a',
  Amarela: '#eab308',
  Laranja: '#ea580c',
  Rosa: '#ec4899',
  Roxa: '#9333ea',
  Dourada: '#d97706',
  Prata: '#9ca3af',
};

function useResolvedImage(src: string) {
  return src;
}

function migrateModel(raw: any): Model {
  // migrate old format where colors was string[]
  if (!raw.colors || raw.colors.length === 0) {
    return { ...raw, colors: [{ name: 'Padrão', image: raw.image || '' }] };
  }
  if (typeof raw.colors[0] === 'string') {
    return {
      ...raw,
      colors: raw.colors.map((c: string) => ({ name: c, image: raw.image || '' })),
    };
  }
  return raw as Model;
}

const DEFAULT_MODELS: Model[] = [
  {
    id: '1',
    name: 'Denty Eco Urban',
    description: 'Perfeito para o dia a dia urbano',
    price: 'R$ 3.990',
    power: '350W',
    autonomy: '25 km',
    speed: '25 km/h',
    battery: 'Lítio',
    batteryType: 'Removível',
    popular: false,
    colors: [
      { name: 'Preta', image: 'https://images.unsplash.com/photo-1742078683530-90a286f14151?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Branca', image: 'https://images.unsplash.com/photo-1742078683530-90a286f14151?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080' },
    ],
  },
  {
    id: '2',
    name: 'Denty Eco Pro',
    description: 'Performance e tecnologia avançada',
    price: 'R$ 5.490',
    power: '500W',
    autonomy: '40 km',
    speed: '30 km/h',
    battery: 'Lítio',
    batteryType: 'Removível',
    popular: false,
    colors: [
      { name: 'Azul', image: 'https://images.unsplash.com/photo-1742079452167-fdf27c535c7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Cinza', image: 'https://images.unsplash.com/photo-1742079452167-fdf27c535c7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080' },
    ],
  },
  {
    id: '3',
    name: 'Denty Eco Max',
    description: 'Máxima potência e autonomia',
    price: 'R$ 7.990',
    power: '800W',
    autonomy: '60 km',
    speed: '35 km/h',
    battery: 'Lítio',
    batteryType: 'Removível',
    popular: false,
    colors: [
      { name: 'Preta', image: 'https://images.unsplash.com/photo-1742078684140-287af4f1142e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Vermelha', image: 'https://images.unsplash.com/photo-1742078684140-287af4f1142e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080' },
    ],
  },
  {
    id: '4',
    name: 'X13',
    description: 'Potência e estilo incomparável',
    price: 'R$ 6.990',
    power: '1000W',
    autonomy: '40 km',
    speed: '32 km/h',
    battery: 'Lítio',
    batteryType: 'Fixa',
    popular: true,
    colors: [
      { name: 'Preta', image: '/image-x13.png' },
      { name: 'Branca', image: '/image-x13.png' },
    ],
  },
];

export function Dashboard() {
  const { logout } = useAuth();
  const [models, setModels] = useState<Model[]>([]);
  const [editingModel, setEditingModel] = useState<Model | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => { loadModels(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadModels = async () => {
    const saved = await api.getModels();
    if (saved && saved.length > 0) {
      setModels(saved.map(migrateModel));
    } else {
      setModels(DEFAULT_MODELS);
      await api.saveModels(DEFAULT_MODELS);
    }
  };

  const saveModels = async (updated: Model[]) => {
    // Upload any base64 images before saving
    const sanitized = await Promise.all(updated.map(async (m) => ({
      ...m,
      colors: await Promise.all(m.colors.map(async (c) => {
        if (c.image.startsWith('data:')) {
          const url = await api.uploadBase64(c.image, 'color-image');
          return { ...c, image: url };
        }
        return c;
      })),
    })));
    await api.saveModels(sanitized);
    setModels(sanitized);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Excluir este modelo?')) return;
    saveModels(models.filter(m => m.id !== id));
  };

  const handleSave = (model: Model) => {
    if (isCreating) {
      saveModels([...models, { ...model, id: Date.now().toString() }]);
      setIsCreating(false);
    } else {
      saveModels(models.map(m => m.id === model.id ? model : m));
      setEditingModel(null);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingModel({
      id: '',
      name: '',
      description: '',
      price: 'R$ 0',
      power: '0W',
      autonomy: '0 km',
      speed: '0 km/h',
      battery: 'Lítio',
      batteryType: 'Removível',
      popular: false,
      available: true,
      colors: [{ name: 'Padrão', image: '' }],
    });
  };

  const handleLogout = () => {
    logout();
    window.history.pushState({}, '', '/admin');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        <header className="border-b border-yellow-500/30 bg-black/50 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl text-white">Painel Admin — Denty Eco</h1>
              <p className="text-sm text-gray-400">Gerenciar Modelos de Scooters</p>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/20 transition-all">
              <LogOut size={18} /> Sair
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl text-white">Modelos Cadastrados ({models.length})</h2>
            <button onClick={handleCreate} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg">
              <Plus size={20} /> Novo Modelo
            </button>
          </div>

          {(editingModel || isCreating) && (
            <ModelForm
              model={editingModel!}
              onSave={handleSave}
              onCancel={() => { setEditingModel(null); setIsCreating(false); }}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {models.map((model) => (
              <AdminModelCard key={model.id} model={model} onEdit={setEditingModel} onDelete={handleDelete} />
            ))}
          </div>

          <div className="border-t border-yellow-500/20 my-10" />

          {/* ── Banners ── */}
          <BannerManager />

          <div className="border-t border-yellow-500/20 my-10" />

          {/* ── Usuários Admin ── */}
          <UsersPanel />

          <div className="border-t border-yellow-500/20 my-10" />

          {/* ── Pixels & Tags ── */}
          <PixelsPanel />

          <div className="border-t border-yellow-500/20 my-10" />

          {/* ── Leads ── */}
          <LeadsPanel />

        </div>
      </div>
    </div>
  );
}

function AdminModelCard({ model, onEdit, onDelete }: {
  model: Model;
  onEdit: (m: Model) => void;
  onDelete: (id: string) => void;
}) {
  const firstImg = useResolvedImage(model.colors[0]?.image ?? '');
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-yellow-500/30 shadow-xl">
      <div className="h-48 overflow-hidden bg-gray-800 flex items-center justify-center">
        {firstImg
          ? <img src={firstImg} alt={model.name} className="w-full h-full object-contain p-2" />
          : <ImageIcon size={48} className="text-gray-600" />}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-lg text-white">{model.name}</h3>
          <div className="flex gap-1.5">
            {model.popular && <span className="text-xs px-2 py-0.5 bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 rounded-full">Popular</span>}
            {model.available === false && <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full">Indisponível</span>}
          </div>
        </div>
        <p className="text-yellow-400 text-sm mb-1">{model.power}</p>
        <p className="text-gray-400 text-sm mb-2">{model.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {model.colors.map(c => (
            <span key={c.name} className="flex items-center gap-1 text-xs px-2 py-0.5 bg-white/10 text-gray-300 rounded-full border border-white/10">
              <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: COLOR_MAP[c.name] || '#888' }} />
              {c.name}
            </span>
          ))}
        </div>
        <p className="text-white text-xl mb-4">{model.price}</p>
        <div className="flex gap-2">
          <button onClick={() => onEdit(model)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-xl hover:bg-blue-500/20 transition-all">
            <Edit2 size={16} /> Editar
          </button>
          <button onClick={() => onDelete(model.id)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/20 transition-all">
            <Trash2 size={16} /> Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

function ColorUpload({ variant, onChange, onRemove, canRemove }: {
  variant: ColorVariant;
  onChange: (v: ColorVariant) => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => onChange({ ...variant, image: e.target?.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white/5 rounded-xl border border-white/10 p-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0" style={{ backgroundColor: COLOR_MAP[variant.name] || '#888' }} />
        <input
          type="text"
          value={variant.name}
          onChange={(e) => onChange({ ...variant, name: e.target.value })}
          placeholder="Nome da cor"
          className="flex-1 bg-transparent text-white text-sm focus:outline-none border-b border-white/20 pb-0.5"
        />
        {canRemove && (
          <button type="button" onClick={onRemove} className="text-gray-500 hover:text-red-400 transition-colors">
            <X size={14} />
          </button>
        )}
      </div>

      <div
        className={`relative rounded-lg border-2 border-dashed cursor-pointer transition-all ${dragging ? 'border-yellow-400 bg-yellow-400/10' : 'border-white/20 hover:border-yellow-400/50'}`}
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
      >
        {variant.image ? (
          <div className="relative">
            <img src={variant.image} alt={variant.name} className="w-full h-28 object-cover rounded-lg" />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange({ ...variant, image: '' }); }}
              className="absolute top-1 right-1 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-all"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 text-gray-500">
            <Upload size={20} className="mb-1" />
            <p className="text-xs">Foto desta cor</p>
          </div>
        )}
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
    </div>
  );
}

function ModelForm({ model, onSave, onCancel }: {
  model: Model;
  onSave: (model: Model) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Model>(model);

  const updateColor = (index: number, variant: ColorVariant) => {
    const updated = [...formData.colors];
    updated[index] = variant;
    setFormData({ ...formData, colors: updated });
  };

  const removeColor = (index: number) => {
    setFormData({ ...formData, colors: formData.colors.filter((_, i) => i !== index) });
  };

  const addColor = () => {
    setFormData({ ...formData, colors: [...formData.colors, { name: 'Nova Cor', image: '' }] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-yellow-500/30 mb-6">
      <h3 className="text-xl text-white mb-6">{model.id ? 'Editar Modelo' : 'Novo Modelo'}</h3>
      <form onSubmit={handleSubmit} className="space-y-5">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Nome</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-white/10 border border-yellow-500/30 rounded-xl text-white focus:outline-none focus:border-yellow-400 transition-colors" required />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Preço</label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, '');
                if (!digits) { setFormData({ ...formData, price: '' }); return; }
                const num = parseInt(digits, 10);
                const formatted = 'R$ ' + num.toLocaleString('pt-BR');
                setFormData({ ...formData, price: formatted });
              }}
              placeholder="R$ 0"
              className="w-full px-4 py-2.5 bg-white/10 border border-yellow-500/30 rounded-xl text-white focus:outline-none focus:border-yellow-400 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Potência</label>
            <div className="relative">
              <input type="number" min="0"
                value={formData.power.replace(/\D/g, '')}
                onChange={(e) => setFormData({ ...formData, power: e.target.value ? `${e.target.value}W` : '' })}
                className="w-full px-4 py-2.5 pr-10 bg-white/10 border border-yellow-500/30 rounded-xl text-white focus:outline-none focus:border-yellow-400 transition-colors" required />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">W</span>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Autonomia</label>
            <div className="relative">
              <input type="number" min="0"
                value={formData.autonomy.replace(/[^\d]/g, '')}
                onChange={(e) => setFormData({ ...formData, autonomy: e.target.value ? `${e.target.value} km` : '' })}
                className="w-full px-4 py-2.5 pr-12 bg-white/10 border border-yellow-500/30 rounded-xl text-white focus:outline-none focus:border-yellow-400 transition-colors" required />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">km</span>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Velocidade Máx.</label>
            <div className="relative">
              <input type="number" min="0"
                value={formData.speed.replace(/[^\d]/g, '')}
                onChange={(e) => setFormData({ ...formData, speed: e.target.value ? `${e.target.value} km/h` : '' })}
                className="w-full px-4 py-2.5 pr-16 bg-white/10 border border-yellow-500/30 rounded-xl text-white focus:outline-none focus:border-yellow-400 transition-colors" required />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">km/h</span>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Tipo de Bateria</label>
            <select value={formData.battery} onChange={(e) => setFormData({ ...formData, battery: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-900 border border-yellow-500/30 rounded-xl text-white focus:outline-none focus:border-yellow-400 transition-colors">
              <option value="Lítio">Lítio</option>
              <option value="Chumbo">Chumbo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Fixação da Bateria</label>
            <select value={formData.batteryType} onChange={(e) => setFormData({ ...formData, batteryType: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-900 border border-yellow-500/30 rounded-xl text-white focus:outline-none focus:border-yellow-400 transition-colors">
              <option value="Removível">Removível</option>
              <option value="Fixa">Fixa</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-300 mb-2">
              Descrição Detalhada <span className="text-red-400 text-xs ml-1">* obrigatório</span>
            </label>
            <textarea
              value={formData.detalhes || ''}
              onChange={(e) => setFormData({ ...formData, detalhes: e.target.value })}
              placeholder="Descreva características, diferenciais, público ideal, acessórios inclusos..."
              rows={4}
              required
              className="w-full px-4 py-2.5 bg-white/10 border border-yellow-500/30 rounded-xl text-white focus:outline-none focus:border-yellow-400 transition-colors resize-none placeholder-gray-600"
            />
          </div>
        </div>

        {/* Cores com upload individual */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm text-gray-300 flex items-center gap-2">
              <Palette size={16} className="text-yellow-400" />
              Cores disponíveis — foto por cor
            </label>
            <button type="button" onClick={addColor}
              className="text-sm px-3 py-1.5 bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 rounded-lg hover:bg-yellow-400/20 transition-all flex items-center gap-1">
              <Plus size={14} /> Adicionar Cor
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {formData.colors.map((variant, i) => (
              <ColorUpload
                key={i}
                variant={variant}
                onChange={(v) => updateColor(i, v)}
                onRemove={() => removeColor(i)}
                canRemove={formData.colors.length > 1}
              />
            ))}
          </div>
        </div>

        {/* Popular toggle */}
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <div onClick={() => setFormData({ ...formData, popular: !formData.popular })}
              className={`w-10 h-6 rounded-full transition-all border relative ${formData.popular ? 'bg-yellow-400 border-yellow-500' : 'bg-white/10 border-white/20'}`}>
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${formData.popular ? 'left-4' : 'left-0.5'}`} />
            </div>
            <span className="text-gray-300 text-sm">Marcar como "Mais Popular"</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <div onClick={() => setFormData({ ...formData, available: !formData.available })}
              className={`w-10 h-6 rounded-full transition-all border relative ${formData.available !== false ? 'bg-green-500 border-green-600' : 'bg-red-500/50 border-red-500'}`}>
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${formData.available !== false ? 'left-4' : 'left-0.5'}`} />
            </div>
            <span className="text-gray-300 text-sm">
              {formData.available !== false ? '✅ Disponível no site' : '❌ Indisponível — oculto no site'}
            </span>
          </label>
        </div>

        <div className="flex gap-4">
          <button type="submit" className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg">
            <Save size={20} /> Salvar Modelo
          </button>
          <button type="button" onClick={onCancel} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/30 rounded-xl hover:bg-white/20 transition-all">
            <X size={20} /> Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── Leads Panel ──────────────────────────────────────────────────────────────

interface Lead {
  id: string;
  name: string;
  phone: string;
  message: string;
  date: string;
}

function LeadsPanel() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const load = async () => setLeads(await api.getLeads());
    load();
  }, []);

  const deleteLead = async (id: string) => {
    await api.deleteLead(id);
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  const exportCSV = () => {
    const header = 'Nome,Telefone,Mensagem,Data\n';
    const rows = leads.map(l =>
      `"${l.name}","${l.phone}","${l.message}","${new Date(l.date).toLocaleString('pt-BR')}"`
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_denty_eco_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Users className="text-yellow-400" size={20} />
          <div>
            <h2 className="text-xl text-white">Contatos Capturados</h2>
            <p className="text-sm text-gray-400">{leads.length} lead{leads.length !== 1 ? 's' : ''} via botão WhatsApp</p>
          </div>
        </div>
        {leads.length > 0 && (
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-all text-sm"
          >
            <Download size={16} /> Exportar CSV
          </button>
        )}
      </div>

      {leads.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-white/5 rounded-2xl border border-white/10 text-gray-500">
          <MessageCircle size={36} className="mb-3 opacity-40" />
          <p className="text-sm">Nenhum contato capturado ainda.</p>
          <p className="text-xs mt-1 text-gray-600">Os clientes aparecem aqui ao clicar no botão WhatsApp do site.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {leads.map((lead) => (
            <div key={lead.id} className="bg-white/5 rounded-2xl border border-white/10 p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                    <Users size={16} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm">{lead.name}</p>
                    <p className="text-gray-400 text-xs">{new Date(lead.date).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</p>
                  </div>
                </div>
                <button onClick={() => deleteLead(lead.id)} className="text-gray-600 hover:text-red-400 transition-colors">
                  <X size={16} />
                </button>
              </div>

              <a
                href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-green-500/10 text-green-400 border border-green-500/20 rounded-xl hover:bg-green-500/20 transition-all text-sm"
              >
                <Phone size={14} />
                {lead.phone}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Banner Manager ────────────────────────────────────────────────────────────

interface BannerSlide {
  image: string;
  mobileImage?: string;
  whatsappText: string;
}

function MobileImageUpload({ slide, onChange }: { slide: BannerSlide; onChange: (s: BannerSlide) => void }) {
  const mobileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => onChange({ ...slide, mobileImage: e.target?.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div className="border-t border-white/10 px-4 pt-3 pb-1">
      <p className="text-xs text-gray-400 mb-2 flex items-center gap-1.5">
        📱 <span>Versão Mobile</span> <span className="text-gray-600">(vertical · 1080×1920px recomendado)</span>
      </p>
      <div
        className={`relative cursor-pointer rounded-lg border-2 border-dashed transition-all ${dragging ? 'border-yellow-400 bg-yellow-400/10' : 'border-white/20 hover:border-yellow-400/50'}`}
        onClick={() => mobileRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
      >
        {slide.mobileImage ? (
          <div className="relative">
            <img src={slide.mobileImage} alt="Mobile" className="w-full h-24 object-cover rounded-lg" />
            <button type="button" onClick={(e) => { e.stopPropagation(); onChange({ ...slide, mobileImage: '' }); }}
              className="absolute top-1 right-1 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-all">
              <X size={12} />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 py-3 text-gray-500 text-xs">
            <Upload size={14} /> Foto vertical para mobile (opcional)
          </div>
        )}
      </div>
      <input ref={mobileRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
    </div>
  );
}

function BannerSlideUpload({ slide, index, total, onChange, onRemove, onMoveUp, onMoveDown }: {
  slide: BannerSlide;
  index: number;
  total: number;
  onChange: (s: BannerSlide) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const resolvedImg = useResolvedImage(slide.image);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => onChange({ ...slide, image: e.target?.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white/5 rounded-2xl border border-yellow-500/20 overflow-hidden">
      {/* Upload zone */}
      <div
        className={`relative cursor-pointer transition-all ${dragging ? 'bg-yellow-400/10' : 'hover:bg-white/5'}`}
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
      >
        {resolvedImg ? (
          <div className="relative">
            <img src={resolvedImg} alt="" className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-sm">Trocar imagem</span>
            </div>
            <button type="button" onClick={(e) => { e.stopPropagation(); onChange({ ...slide, image: '' }); }}
              className="absolute top-2 right-2 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-all">
              <X size={14} />
            </button>
            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-lg">
              Slide {index + 1}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <Image size={32} className="mb-2" />
            <p className="text-sm">Arraste ou clique para adicionar banner</p>
            <p className="text-xs mt-1 text-gray-600">Recomendado: 1920 × 1080px</p>
          </div>
        )}
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />

      {/* Upload versão mobile */}
      <MobileImageUpload slide={slide} onChange={onChange} />

      <div className="p-4 space-y-3">
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Mensagem do botão Contato (WhatsApp)</label>
          <input
            value={slide.whatsappText}
            onChange={(e) => onChange({ ...slide, whatsappText: e.target.value })}
            placeholder="Ex: Vim pelo site! Quero saber mais"
            className="w-full px-3 py-2 bg-white/10 border border-yellow-500/20 rounded-lg text-white text-sm focus:outline-none focus:border-yellow-400"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Slide {index + 1} de {total}</span>
          <div className="flex gap-2">
            <button type="button" onClick={onMoveUp} disabled={index === 0}
              className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded-lg disabled:opacity-30 hover:bg-white/20 transition-all">↑</button>
            <button type="button" onClick={onMoveDown} disabled={index === total - 1}
              className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded-lg disabled:opacity-30 hover:bg-white/20 transition-all">↓</button>
            <button type="button" onClick={onRemove} disabled={total <= 1}
              className="px-2 py-1 text-xs bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg disabled:opacity-30 hover:bg-red-500/20 transition-all">
              <Trash2 size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BannerManager() {
  const [slides, setSlides] = useState<BannerSlide[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const saved = await api.getBanners();
      if (saved && saved.length > 0) {
        // migrate old format
        const parsed = saved.map((s: any) => ({ image: s.image || '', whatsappText: s.whatsappText || 'Vim pelo site! Quero saber mais' }));
        setSlides(parsed);
      } else {
        setSlides([{ image: '', whatsappText: 'Vim pelo site! Quero conhecer mais sobre as scooters Denty Eco' }]);
      }
    };
    load();
  }, []);

  const updateSlide = (i: number, s: BannerSlide) => setSlides(prev => prev.map((sl, idx) => idx === i ? s : sl));
  const addSlide = () => setSlides(prev => [...prev, { image: '', whatsappText: 'Vim pelo site! Quero saber mais' }]);
  const removeSlide = (i: number) => setSlides(prev => prev.filter((_, idx) => idx !== i));
  const moveUp = (i: number) => { if (i === 0) return; setSlides(prev => { const a = [...prev]; [a[i - 1], a[i]] = [a[i], a[i - 1]]; return a; }); };
  const moveDown = (i: number) => { if (i === slides.length - 1) return; setSlides(prev => { const a = [...prev]; [a[i], a[i + 1]] = [a[i + 1], a[i]]; return a; }); };

  const handleSave = async () => {
    setSaving(true);
    const sanitized = await Promise.all(slides.map(async (s) => {
      let image = s.image;
      let mobileImage = s.mobileImage;
      if (image?.startsWith('data:')) image = await api.uploadBase64(image, 'banner-desktop');
      if (mobileImage?.startsWith('data:')) mobileImage = await api.uploadBase64(mobileImage, 'banner-mobile');
      return { ...s, image, mobileImage };
    }));
    await api.saveBanners(sanitized);
    setSlides(sanitized);
    setSaving(false);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <GripVertical className="text-yellow-400" size={20} />
          <div>
            <h2 className="text-xl text-white">Banners do Site</h2>
            <p className="text-sm text-gray-400">Carrossel na página inicial — imagem cheia com botões "Saiba Mais" e "Contato"</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={addSlide} className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-all text-sm">
            <Plus size={16} /> Novo Slide
          </button>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all text-sm shadow-lg disabled:opacity-60">
            <Save size={16} /> {saving ? 'Salvando...' : 'Salvar Banners'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {slides.map((slide, i) => (
          <BannerSlideUpload
            key={i}
            slide={slide}
            index={i}
            total={slides.length}
            onChange={(s) => updateSlide(i, s)}
            onRemove={() => removeSlide(i)}
            onMoveUp={() => moveUp(i)}
            onMoveDown={() => moveDown(i)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Pixels & Tags Panel ──────────────────────────────────────────────────────

function PixelsPanel() {
  const empty = { gtmId: '', ga4Id: '', googleAdsId: '', googleAdsLabel: '', metaPixelId: '' };
  const [config, setConfig] = useState(empty);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      const s = await api.getTracking();
      if (s) setConfig(s);
    };
    load();
  }, []);

  const handleSave = async () => {
    await api.saveTracking(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const Field = ({ label, placeholder, hint, value, onChange }: {
    label: string; placeholder: string; hint: string; value: string; onChange: (v: string) => void;
  }) => (
    <div>
      <label className="text-sm text-gray-300 mb-1 block">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition-colors"
      />
      <p className="text-xs text-gray-600 mt-1">{hint}</p>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Tag className="text-yellow-400" size={20} />
          <div>
            <h2 className="text-xl text-white">Pixels & Tags de Rastreamento</h2>
            <p className="text-sm text-gray-400">Google Analytics, Google Ads, Meta Pixel e Tag Manager</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all text-sm shadow-lg"
        >
          {saved ? <><CheckCircle size={16} /> Salvo!</> : <><Save size={16} /> Salvar</>}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* GTM */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-5 space-y-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded bg-blue-500/20 flex items-center justify-center">
              <span className="text-blue-400 text-xs font-bold">GTM</span>
            </div>
            <p className="text-white text-sm">Google Tag Manager</p>
            <span className="ml-auto text-xs px-2 py-0.5 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">Recomendado</span>
          </div>
          <Field
            label="ID do Contêiner"
            placeholder="GTM-XXXXXXX"
            hint="Encontre em tagmanager.google.com → Seu contêiner"
            value={config.gtmId}
            onChange={(v) => setConfig({ ...config, gtmId: v })}
          />
        </div>

        {/* GA4 */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded bg-orange-500/20 flex items-center justify-center">
              <span className="text-orange-400 text-xs font-bold">GA4</span>
            </div>
            <p className="text-white text-sm">Google Analytics 4</p>
          </div>
          <Field
            label="ID de Medição"
            placeholder="G-XXXXXXXXXX"
            hint="Encontre em analytics.google.com → Admin → Fluxos de dados"
            value={config.ga4Id}
            onChange={(v) => setConfig({ ...config, ga4Id: v })}
          />
        </div>

        {/* Google Ads */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-5 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded bg-yellow-500/20 flex items-center justify-center">
              <span className="text-yellow-400 text-xs font-bold">Ads</span>
            </div>
            <p className="text-white text-sm">Google Ads</p>
          </div>
          <Field
            label="ID de Conversão"
            placeholder="AW-XXXXXXXXXX"
            hint="Encontre em ads.google.com → Ferramentas → Conversões"
            value={config.googleAdsId}
            onChange={(v) => setConfig({ ...config, googleAdsId: v })}
          />
          <Field
            label="Label de Conversão (opcional)"
            placeholder="AbCdEfGhIj"
            hint="Aparece junto ao ID de conversão no Google Ads"
            value={config.googleAdsLabel}
            onChange={(v) => setConfig({ ...config, googleAdsLabel: v })}
          />
        </div>

        {/* Meta Pixel */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded bg-blue-700/30 flex items-center justify-center">
              <span className="text-blue-300 text-xs font-bold">Meta</span>
            </div>
            <p className="text-white text-sm">Meta Pixel (Facebook/Instagram)</p>
          </div>
          <Field
            label="ID do Pixel"
            placeholder="XXXXXXXXXXXXXXXXXX"
            hint="Encontre em business.facebook.com → Gerenciador de Eventos"
            value={config.metaPixelId}
            onChange={(v) => setConfig({ ...config, metaPixelId: v })}
          />
        </div>
      </div>

      <p className="text-xs text-gray-600 mt-4">
        * Os scripts são injetados automaticamente no site após salvar. Recarregue a página para ativar.
      </p>
    </div>
  );
}

// ─── Users Panel ──────────────────────────────────────────────────────────────

function UsersPanel() {
  const [users, setUsers] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    api.getAdminUsers().then(setUsers).catch(console.error);
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      await api.createAdminUser(email, password);
      const updated = await api.getAdminUsers();
      setUsers(updated);
      setEmail('');
      setPassword('');
      setMsg({ type: 'ok', text: 'Usuário criado com sucesso!' });
    } catch (err: any) {
      setMsg({ type: 'err', text: err.message });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, userEmail: string) => {
    if (!confirm(`Remover o usuário ${userEmail}?`)) return;
    try {
      await api.deleteAdminUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <ShieldCheck className="text-yellow-400" size={20} />
        <div>
          <h2 className="text-xl text-white">Usuários do Sistema</h2>
          <p className="text-sm text-gray-400">Gerencie quem tem acesso ao painel admin</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Criar novo usuário */}
        <div className="bg-white/5 rounded-2xl border border-yellow-500/20 p-5">
          <h3 className="text-white text-sm mb-4 flex items-center gap-2"><UserPlus size={16} className="text-yellow-400" /> Adicionar Admin</h3>
          <form onSubmit={handleCreate} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@dentyeco.com.br"
              required
              className="w-full px-4 py-2.5 bg-white/10 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-400"
            />
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha forte"
                required
                minLength={8}
                className="w-full px-4 py-2.5 bg-white/10 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-400 pr-10"
              />
              <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {msg && (
              <p className={`text-xs px-3 py-2 rounded-lg ${msg.type === 'ok' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{msg.text}</p>
            )}
            <button type="submit" disabled={saving} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-xl text-sm disabled:opacity-60">
              <UserPlus size={16} /> {saving ? 'Criando...' : 'Criar Usuário'}
            </button>
          </form>
        </div>

        {/* Lista de usuários */}
        <div className="bg-white/5 rounded-2xl border border-yellow-500/20 p-5">
          <h3 className="text-white text-sm mb-4 flex items-center gap-2"><Users size={16} className="text-yellow-400" /> Admins Cadastrados ({users.length})</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {users.map(u => (
              <div key={u.id} className="flex items-center justify-between px-3 py-2 bg-white/5 rounded-xl border border-white/10">
                <div>
                  <p className="text-white text-sm">{u.email}</p>
                  <p className="text-gray-500 text-xs">
                    {u.last_sign_in_at ? `Último acesso: ${new Date(u.last_sign_in_at).toLocaleDateString('pt-BR')}` : 'Nunca acessou'}
                  </p>
                </div>
                <button onClick={() => handleDelete(u.id, u.email)} className="text-gray-600 hover:text-red-400 transition-colors ml-2">
                  <X size={16} />
                </button>
              </div>
            ))}
            {users.length === 0 && <p className="text-gray-600 text-sm text-center py-4">Nenhum usuário cadastrado</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
