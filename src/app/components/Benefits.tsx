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
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            Por Que Escolher a Mobilidade Elétrica?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Descubra os benefícios de uma nova forma de se locomover
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-yellow-500/20 transition-all hover:-translate-y-2 group border border-yellow-500/30 hover:border-yellow-400/60"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.color} backdrop-blur-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xl shadow-yellow-500/50 border border-yellow-400`}>
                <benefit.icon className="text-black" size={32} />
              </div>
              <h3 className="text-xl mb-3 text-white">
                {benefit.title}
              </h3>
              <p className="text-gray-400">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
