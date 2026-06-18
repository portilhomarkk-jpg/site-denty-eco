import { Target, Zap, Heart } from 'lucide-react';
// @ts-ignore
import scooterImg from '../../imports/M4_1000w_-_branca-1.png';

export function About() {
  return (
    <section id="quem-somos" className="py-10 sm:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">

          {/* Texto */}
          <div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl text-white mb-4 sm:mb-6">
              Quem Somos
            </h2>
            <div className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-lg">
              <p>
                A <span className="text-yellow-400">Denty Eco</span> nasceu em <strong>Joinville, SC</strong>, de quem já sabe o que é qualidade sobre duas rodas.
              </p>
              <p>
                Há 25 anos, a <span className="text-yellow-400">Denty Motos</span> é referência em motocicletas em Joinville e região — vendas, manutenção e atendimento para quem leva a moto a sério. Esse histórico é a base que nos deu confiança para dar o próximo passo.
              </p>
              <p>
                A <span className="text-yellow-400">Denty Eco</span> é esse passo: <strong>scooters elétricas em Joinville</strong> para quem quer se mover com inteligência, praticidade e consciência. Mobilidade urbana que respeita seu tempo e o planeta.
              </p>
              <p>Duas rodas sempre foram nossa linguagem. Agora falamos o futuro.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-6 mt-6 sm:mt-8">
              <div className="bg-white/5 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-yellow-500/30">
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <Target className="text-yellow-400" size={20} />
                  <span className="text-2xl sm:text-3xl text-white">25</span>
                </div>
                <p className="text-gray-400 text-xs sm:text-base">Anos de Experiência</p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-yellow-500/30">
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <Zap className="text-yellow-400" size={20} />
                  <span className="text-2xl sm:text-3xl text-white">100%</span>
                </div>
                <p className="text-gray-400 text-xs sm:text-base">Elétrico</p>
              </div>
            </div>
          </div>

          {/* Imagem */}
          <div className="relative mt-6 sm:mt-0">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-4 sm:p-8 border border-yellow-500/30 shadow-2xl shadow-yellow-500/20">
              <img
                src={scooterImg}
                alt="Denty Eco M4"
                className="w-full h-auto rounded-2xl"
              />
            </div>

            <div className="absolute -bottom-5 -left-4 sm:-bottom-8 sm:-left-8 bg-gradient-to-br from-yellow-400 to-yellow-500 p-3 sm:p-6 rounded-2xl shadow-xl shadow-yellow-500/50 border border-yellow-400">
              <div className="flex items-center gap-2 sm:gap-3">
                <Heart className="text-black" size={22} />
                <div>
                  <p className="text-black text-lg sm:text-2xl">100%</p>
                  <p className="text-black/80 text-xs sm:text-sm">Sustentável</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
