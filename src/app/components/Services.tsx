export function Services() {
  const services = [
    {
      image: '/assistencia.jpg',
      title: 'Assistência Técnica para Scooters',
      description: 'Manutenção especializada com 25 anos de experiência. Equipe técnica treinada e peças originais.',
      items: ['Revisão completa', 'Manutenção preventiva', 'Diagnóstico eletrônico', 'Reparo de baterias'],
    },
    {
      image: '/pecas-v3.jpg',
      title: 'Peças',
      description: 'Peças originais e de qualidade para sua scooter. Estoque completo para todos os modelos.',
      items: ['Baterias de lítio', 'Motores e controladores', 'Pneus e câmaras', 'Acessórios diversos'],
    },
  ];

  return (
    <section id="servicos" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            Nossos Serviços
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Qualidade e experiência a serviço da sua mobilidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-yellow-500/20 transition-all group border border-yellow-500/30"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 bg-gradient-to-b from-transparent to-black/20">
                <h3 className="text-2xl mb-3 text-white">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-300">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/554730283351?text=${encodeURIComponent(`Vim pelo site! Quero ver mais detalhes sobre ${service.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg shadow-yellow-500/50 border border-yellow-400 flex items-center justify-center"
                >
                  Solicitar Orçamento
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
