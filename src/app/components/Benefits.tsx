import { Zap, Leaf, DollarSign, Clock } from 'lucide-react';

export function Benefits() {
  const benefits = [
    {
      icon: Leaf,
      title: '100% Sustentável',
      description: 'Zero emissões de carbono. Contribua para um planeta mais limpo e saudável.',
      color: 'from-yellow-400 to-yellow-500',
    },
    {
      icon: DollarSign,
      title: 'Economia Garantida',
      description: 'Reduza seus gastos com transporte em até 70% comparado a carros convencionais.',
      color: 'from-yellow-500 to-amber-500',
    },
    {
      icon: Clock,
      title: 'Mobilidade Rápida',
      description: 'Evite congestionamentos e chegue ao seu destino mais rápido.',
      color: 'from-amber-400 to-orange-400',
    },
    {
      icon: Zap,
      title: 'Tecnologia Avançada',
      description: 'Veículos conectados com app, GPS e bateria de longa duração.',
      color: 'from-yellow-300 to-yellow-400',
    },
  ];

  return (
    <section id="beneficios" className="py-20 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-yellow-400 text-sm uppercase tracking-widest mb-3">Por que elétrico?</p>
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            Vantagens que Você Sente<br className="hidden sm:block" /> no Dia a Dia
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Quem já tem uma scooter elétrica não volta atrás
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="relative bg-white/5 backdrop-blur-xl p-7 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-yellow-500/20 transition-all hover:-translate-y-1 group border border-white/10 hover:border-yellow-400/40"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent rounded-t-2xl" />
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-lg shadow-yellow-500/30`}>
                <benefit.icon className="text-black" size={26} />
              </div>
              <h3 className="text-lg text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
