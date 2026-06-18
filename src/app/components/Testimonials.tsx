import { Star } from 'lucide-react';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export function Testimonials() {
  const testimonials = [
    {
      name: 'Ana Silva',
      role: 'Joinville, SC',
      text: 'Economizei muito tempo e dinheiro. Não preciso mais me preocupar com estacionamento ou gasolina!',
      rating: 5,
    },
    {
      name: 'Carlos Mendes',
      role: 'Joinville, SC',
      text: 'Perfeito para o dia a dia. A scooter é silenciosa, econômica e o atendimento da Denty Eco é excelente.',
      rating: 5,
    },
    {
      name: 'Mariana Costa',
      role: 'Jaraguá do Sul, SC',
      text: 'Adoro poder me locomover de forma sustentável. Sinto que estou fazendo a diferença para o meio ambiente.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Milhares de pessoas já transformaram sua mobilidade urbana
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-yellow-500/20 transition-all border border-yellow-500/30 hover:border-yellow-400/60"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
                <GoogleIcon />
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-yellow-400 drop-shadow-lg" size={18} />
                ))}
              </div>

              <p className="text-gray-300 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
