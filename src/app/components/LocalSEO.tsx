import { MapPin, Zap } from 'lucide-react';

const cities = [
  'Joinville', 'Jaraguá do Sul', 'Blumenau', 'Itajaí',
  'Balneário Camboriú', 'Florianópolis', 'São Bento do Sul', 'Brusque',
];

const faqs = [
  {
    q: 'Onde comprar scooter elétrica em Joinville?',
    a: 'A Denty Eco é a loja especializada em scooters elétricas em Joinville, SC. Com 25 anos de experiência no mercado de duas rodas, oferecemos modelos de 350W a 1000W com bateria de lítio e assistência técnica local.',
  },
  {
    q: 'A scooter elétrica tem autonomia suficiente para Joinville?',
    a: 'Sim! Nossas scooters elétricas têm autonomia de 25 a 60 km por carga, suficiente para o dia a dia em Joinville. A bateria de lítio removível pode ser carregada em qualquer tomada comum em 4 a 6 horas.',
  },
  {
    q: 'A Denty Eco faz assistência técnica de scooter elétrica em Joinville?',
    a: 'Sim. A Denty Eco oferece assistência técnica especializada em scooters elétricas em Joinville, com equipe treinada, peças originais e diagnóstico eletrônico. Somos referência há 25 anos no mercado de duas rodas na região.',
  },
  {
    q: 'A scooter elétrica precisa de habilitação em Joinville?',
    a: 'Depende da potência. Modelos até 50cc (4kW) dispensam CNH e emplacamento. Para modelos acima disso, é necessário habilitação categoria A. Consulte nossa equipe em Joinville para indicar o modelo ideal para o seu perfil.',
  },
];

export function LocalSEO() {
  return (
    <>
      {/* Seção de cobertura regional */}
      <section className="py-14 bg-black border-t border-yellow-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <MapPin className="text-yellow-400" size={20} />
              <h2 className="text-xl sm:text-2xl text-white">
                Scooter Elétrica em <span className="text-yellow-400">Joinville</span> e Região
              </h2>
            </div>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
              A <strong className="text-white">Denty Eco</strong> está em Joinville, SC, e atende toda a região Norte de Santa Catarina.
              Compre sua moto elétrica com quem entende de duas rodas há 25 anos.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {cities.map(city => (
              <span key={city} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-yellow-500/20 rounded-full text-sm text-gray-300">
                <Zap size={12} className="text-yellow-400" />
                {city}
              </span>
            ))}
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto space-y-4">
            <h3 className="text-lg text-white text-center mb-6">Perguntas Frequentes</h3>
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white/5 border border-yellow-500/20 rounded-2xl overflow-hidden group">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-white text-sm sm:text-base list-none">
                  <span>{faq.q}</span>
                  <span className="text-yellow-400 ml-4 flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="px-5 pb-4 text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* JSON-LD FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(f => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
    </>
  );
}
