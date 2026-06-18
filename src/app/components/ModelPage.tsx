import { useState, useEffect } from 'react';
import { Battery, Zap, Gauge, BatteryCharging, ArrowLeft } from 'lucide-react';
import { api } from '../utils/api';

const COLOR_MAP: Record<string, string> = {
  Preta: '#1a1a1a', Branca: '#ffffff', Vermelha: '#dc2626',
  Azul: '#2563eb', Cinza: '#6b7280', Verde: '#16a34a',
  Amarela: '#eab308', Laranja: '#ea580c', Rosa: '#ec4899',
  Roxa: '#9333ea', Dourada: '#d97706', Prata: '#9ca3af',
};

export function ModelPage({ modelId }: { modelId: string }) {
  const [model, setModel] = useState<any>(null);
  const [selColor, setSelColor] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getModels().then(models => {
      const found = models.find((m: any) => m.id === modelId || m.name.toLowerCase().replace(/\s+/g, '-') === modelId);
      setModel(found || null);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [modelId]);

  const goBack = () => {
    window.history.back();
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!model) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
      <p className="text-white text-xl">Modelo não encontrado</p>
      <button onClick={goBack} className="text-yellow-400 flex items-center gap-2">
        <ArrowLeft size={18} /> Voltar
      </button>
    </div>
  );

  const curColor = model.colors[selColor] || model.colors[0];
  const img = curColor?.image;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-xl border-b border-yellow-500/20 px-4 py-3 flex items-center gap-3">
        <button onClick={goBack} className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-yellow-400 hover:text-black transition-all">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-white text-lg leading-none">{model.name}</h1>
          <p className="text-yellow-400 text-xs">{model.price}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-12">
        {/* Imagem */}
        <div className="h-72 sm:h-96 bg-gray-800/50 flex items-center justify-center overflow-hidden my-6 rounded-2xl border border-yellow-500/20">
          {img && <img src={img} alt={model.name} className="w-full h-full object-contain scale-[1.3]" />}
        </div>

        {/* Cores */}
        <div className="flex items-center gap-3 mb-6">
          {model.colors.map((c: any, i: number) => (
            <button key={i} onClick={() => setSelColor(i)}
              className={`w-9 h-9 rounded-full border-2 transition-all ${i === selColor ? 'border-yellow-400 scale-110' : 'border-white/30'}`}
              style={{ backgroundColor: COLOR_MAP[c.name] || '#888' }} title={c.name} />
          ))}
          <span className="text-gray-300 text-sm">{curColor?.name}</span>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { icon: Zap, label: 'Potência', val: model.power },
            { icon: Battery, label: 'Autonomia', val: model.autonomy },
            { icon: Gauge, label: 'Velocidade', val: model.speed },
            { icon: BatteryCharging, label: 'Bateria', val: model.battery, sub: model.batteryType },
          ].map(({ icon: Icon, label, val, sub }) => (
            <div key={label} className="bg-white/5 rounded-xl p-4 flex items-start gap-3 border border-white/5">
              <Icon className="text-yellow-400 flex-shrink-0 mt-0.5" size={18} />
              <div>
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-white text-sm">{val}</p>
                {sub && <p className="text-gray-500 text-xs">{sub}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Descrição detalhada */}
        {model.detalhes && (
          <div className="bg-white/5 rounded-2xl p-5 mb-6 border border-yellow-500/10">
            <h2 className="text-yellow-400 text-xs uppercase tracking-widest mb-3">Sobre o modelo</h2>
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{model.detalhes}</p>
          </div>
        )}

        {/* CTA */}
        <a
          href={`https://wa.me/554730283351?text=${encodeURIComponent(`Vim pelo site! Quero saber mais sobre o ${model.name} na cor ${curColor?.name}`)}`}
          target="_blank" rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-full text-sm font-medium hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg shadow-yellow-500/30"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Tenho Interesse — Falar com Consultor
        </a>
      </div>
    </div>
  );
}
