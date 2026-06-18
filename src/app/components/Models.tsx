import { Battery, Zap, Gauge, BatteryCharging, Info } from 'lucide-react';
import { useState, useEffect } from 'react';

const MessageIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-black">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
import { api } from '../utils/api';

function useResolvedImage(src: string) {
  return src;
}

interface ColorVariant {
  name: string;
  image: string;
}

interface ModelData {
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

const COLOR_MAP: Record<string, string> = {
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

function migrateModel(raw: any): ModelData {
  if (!raw.colors || raw.colors.length === 0) {
    return { ...raw, colors: [{ name: 'Padrão', image: raw.image || '' }] };
  }
  if (typeof raw.colors[0] === 'string') {
    return { ...raw, colors: raw.colors.map((c: string) => ({ name: c, image: raw.image || '' })) };
  }
  return raw as ModelData;
}


function ModelCard({ model }: { model: ModelData }) {
  const [selectedColor, setSelectedColor] = useState(0);

  const current = model.colors[selectedColor] || model.colors[0];
  const resolvedImage = useResolvedImage(current?.image ?? '');

  const goToDetail = () => {
    const slug = model.name.toLowerCase().replace(/\s+/g, '-');
    window.history.pushState({}, '', `/modelos/${slug}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleShare = () => {
    const msg = `Confira o modelo ${model.name} da Denty Eco!\n\nPreço: ${model.price}\nPotência: ${model.power}\nAutonomia: ${model.autonomy}\nVelocidade: ${model.speed}\nBateria: ${model.battery} — ${model.batteryType}\n\nVeja mais: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div
      id={`modelo-${model.name.toLowerCase().replace(/\s+/g, '-')}`}
      className={`relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-yellow-500/20 transition-all group flex flex-col ${
        model.popular ? 'border-2 border-yellow-400' : 'border border-yellow-500/30'
      }`}
    >
      {model.popular && (
        <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-1 rounded-full text-sm shadow-lg shadow-yellow-500/50">
          Mais Popular
        </div>
      )}

      {/* Imagem da cor selecionada */}
      <div className="relative h-72 overflow-hidden bg-gray-900">
        {resolvedImage ? (
          <img
            key={resolvedImage}
            src={resolvedImage}
            alt={`${model.name} — ${current.name}`}
            className="w-full h-full object-contain scale-[1.55] group-hover:scale-[1.63] transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-700">
            <Zap size={48} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      <div className="p-5 flex flex-col flex-1">
        {/* Nome + potência */}
        <h3 className="text-lg text-white leading-tight line-clamp-2 min-h-[3.25rem]">{model.name}</h3>
        <p className="text-yellow-400 text-xs mb-3">{model.power}</p>

        {/* Cores como pills */}
        <p className="text-xs text-gray-400 mb-1.5">Cores disponíveis:</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {model.colors.map((c, i) => {
            const isSelected = i === selectedColor;
            return (
              <button key={i} type="button" onClick={() => setSelectedColor(i)}
                className={`px-3 py-1 rounded-full text-xs border transition-all ${
                  isSelected
                    ? 'bg-yellow-400 border-yellow-400 text-black'
                    : 'bg-white/5 border-white/20 text-gray-300 hover:border-yellow-400/50'
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>

        {/* Specs 2x2 */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-4">
          <div><p className="text-xs text-gray-400">Autonomia:</p><p className="text-white text-xs font-medium">{model.autonomy}</p></div>
          <div><p className="text-xs text-gray-400">Velocidade:</p><p className="text-white text-xs font-medium">{model.speed}</p></div>
          <div><p className="text-xs text-gray-400">Bateria:</p><p className="text-white text-xs font-medium">{model.battery}</p></div>
          <div><p className="text-xs text-gray-400">Tipo:</p><p className="text-white text-xs font-medium">{model.batteryType}</p></div>
        </div>

        {/* Preço + ações */}
        <div className="mt-auto">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">A partir de:</p>
              <p className="text-2xl font-bold text-white">{model.price}</p>
            </div>
            <a
              href={`https://wa.me/554730283351?text=${encodeURIComponent(`Vim pelo site! Tenho interesse no modelo ${model.name} na cor ${current?.name}`)}`}
              target="_blank" rel="noopener noreferrer"
              className="w-11 h-11 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg shadow-yellow-500/40 flex-shrink-0"
              title="Falar com Vendedor"
            >
              <MessageIcon />
            </a>
          </div>
          {model.detalhes && (
            <button onClick={goToDetail}
              className="w-full py-1.5 text-gray-400 text-xs hover:text-yellow-400 transition-colors text-center">
              Inf. Completas →
            </button>
          )}
        </div>
      </div>

    </div>
  );
}

export function Models() {
  const [models, setModels] = useState<ModelData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getModels()
      .then(data => setModels((data as any[]).map(migrateModel).filter((m: ModelData) => m.available !== false)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="modelos" className="py-20 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-white mb-4">Escolha a Ideal para Você</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Temos o modelo perfeito para cada necessidade</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {models.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
