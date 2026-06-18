import { Smartphone, MapPin, Unlock, Navigation } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: Smartphone,
      title: 'Baixe o App',
      description: 'Faça o download gratuito e crie sua conta em segundos',
      step: '01',
    },
    {
      icon: MapPin,
      title: 'Encontre um Veículo',
      description: 'Localize o patinete ou bicicleta mais próximo no mapa',
      step: '02',
    },
    {
      icon: Unlock,
      title: 'Desbloqueie',
      description: 'Escaneie o QR Code e desbloqueie seu veículo',
      step: '03',
    },
    {
      icon: Navigation,
      title: 'Aproveite',
      description: 'Siga seu caminho de forma sustentável e econômica',
      step: '04',
    },
  ];

  return (
    <section id="como-funciona" className="py-20 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            Como Funciona?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            É simples, rápido e totalmente digital
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/20 transition-all hover:border-yellow-400/60">
                <div className="relative inline-block mb-6">
                  <div className="absolute -top-4 -right-4 text-6xl font-bold text-yellow-500/20">
                    {step.step}
                  </div>
                  <div className="relative w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl shadow-xl shadow-yellow-500/50 flex items-center justify-center border border-yellow-400">
                    <step.icon className="text-black" size={36} />
                  </div>
                </div>
                <h3 className="text-xl mb-3 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-400">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-yellow-500/40 to-transparent"></div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href={`https://wa.me/554730283351?text=${encodeURIComponent('Vim pelo site! Quero conhecer mais sobre as scooters Denty Eco')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-xl shadow-yellow-500/50 border border-yellow-400"
          >
            Baixar App Agora
          </a>
        </div>
      </div>
    </section>
  );
}
