import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Precisa de CNH para andar de scooter elétrica em Joinville?',
    answer:
      'Depende da potência. Scooters elétricas autopropelidas com até 350W e velocidade máxima de 32 km/h são equiparadas a bicicletas: não precisam de CNH, emplacamento nem seguro. Modelos acima de 350W exigem CNH categoria A. Na Denty Eco temos modelos para os dois perfis. Fale conosco e indicamos o ideal para o seu caso.',
  },
  {
    question: 'Qual é a autonomia das scooters elétricas da Denty Eco?',
    answer:
      'Nossos modelos têm autonomia de 40 km (Urban 350W) a 80 km (X13 1000W) por carga, dependendo do peso do piloto, terreno e velocidade. Com bateria de lítio de alta qualidade, a recarga completa leva de 4 a 6 horas em tomada comum 110V/220V.',
  },
  {
    question: 'Quanto custa para carregar uma scooter elétrica?',
    answer:
      'O custo médio de recarga completa é de R$ 1,50 a R$ 3,00 na conta de luz, o que equivale a percorrer 40–80 km. Comparado à gasolina, a economia chega a 90% no custo por quilômetro rodado.',
  },
  {
    question: 'A Denty Eco faz assistência técnica para scooters elétricas em Joinville?',
    answer:
      'Sim! Temos oficina especializada com 25 anos de experiência em veículos de duas rodas. Realizamos manutenção preventiva, troca de bateria, diagnóstico eletrônico e reparo de motor. Atendemos na Rua Albano Schmidt, 5268, Comasa, Joinville.',
  },
  {
    question: 'Vocês entregam scooters elétricas fora de Joinville?',
    answer:
      'Sim, entregamos para toda a região metropolitana de Joinville, incluindo Jaraguá do Sul, São Bento do Sul e Schroeder. Para outras cidades de Santa Catarina, consulte disponibilidade via WhatsApp.',
  },
  {
    question: 'Quanto tempo dura a bateria de uma scooter elétrica?',
    answer:
      'As baterias de lítio dos nossos modelos têm vida útil de 500 a 800 ciclos de carga, equivalente a 3–5 anos de uso regular. Após esse período, a bateria pode ser substituída mantendo o restante da scooter funcionando perfeitamente.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-schema';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    });
    document.head.appendChild(script);
    return () => { document.getElementById('faq-schema')?.remove(); };
  }, []);

  return (
    <section id="faq" className="py-20 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <p className="text-yellow-400 text-sm uppercase tracking-widest mb-3">Dúvidas frequentes</p>
          <h2 className="text-4xl md:text-5xl text-white mb-4">Perguntas Frequentes</h2>
          <p className="text-gray-400 text-lg">Tudo que você precisa saber antes de comprar sua scooter elétrica em Joinville</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-400/30 transition-colors"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-white text-sm sm:text-base leading-snug">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-yellow-400 flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
