import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
// @ts-ignore
import logoImg from '../../imports/logo_denty_eco_branco.png';

export function Footer() {
  return (
    <footer id="contato" className="bg-black text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <img
              src={logoImg}
              alt="Denty Eco"
              className="h-10 w-auto mb-4 drop-shadow-lg"
            />
            <p className="text-gray-400 mb-4">
              Transformando a mobilidade urbana com soluções sustentáveis e inteligentes.
            </p>
            <div className="flex gap-4 mb-4">
              <a href="https://www.instagram.com/denty_motoss/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all border border-white/20 shadow-lg">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all border border-white/20 shadow-lg">
                <Facebook size={20} />
              </a>
            </div>
            <a
              href="https://share.google/XXGTnQnHzdwuje7VK"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-full hover:bg-white/10 transition-all text-sm text-gray-300 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Avalie-nos no Google
            </a>
          </div>

          <div>
            <h3 className="text-lg mb-4 text-yellow-400">Empresa</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Imprensa</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg mb-4 text-yellow-400">Serviços</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#servicos" className="hover:text-yellow-400 transition-colors">Assistência Técnica</a></li>
              <li><a href="#servicos" className="hover:text-yellow-400 transition-colors">Peças</a></li>
              <li><a href="#modelos" className="hover:text-yellow-400 transition-colors">Modelos</a></li>
              <li><a href="#contato" className="hover:text-yellow-400 transition-colors">Ajuda & Suporte</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg mb-4 text-yellow-400">Contato</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <Mail size={20} className="mt-0.5 flex-shrink-0 text-yellow-400" />
                <span>contato@dentyeco.com.br</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={20} className="mt-0.5 flex-shrink-0 text-yellow-400" />
                <a
                  href={`https://wa.me/554730283351?text=${encodeURIComponent('Vim pelo site! Quero conhecer mais sobre as scooters Denty Eco')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-400 transition-colors"
                >
                  (47) 3028-3351
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={20} className="mt-0.5 flex-shrink-0 text-yellow-400" />
                <span>Joinville, SC</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-gray-400">
          <p>&copy; 2026 Denty Eco. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
