import { Menu, X } from 'lucide-react';
import { useState } from 'react';
// @ts-ignore
import logoImg from '../../imports/logo_denty_eco_branco.png';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-xl z-50 border-b border-yellow-400/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              src={logoImg}
              alt="Denty Eco"
              className="h-10 w-auto drop-shadow-lg"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#inicio" className="text-white hover:text-yellow-400 transition-colors">
              Início
            </a>
            <a href="#quem-somos" className="text-white hover:text-yellow-400 transition-colors">
              Quem Somos
            </a>
            <a href="#modelos" className="text-white hover:text-yellow-400 transition-colors">
              Modelos
            </a>
            <a href="#beneficios" className="text-white hover:text-yellow-400 transition-colors">
              Benefícios
            </a>
            <a href="#servicos" className="text-white hover:text-yellow-400 transition-colors">
              Serviços
            </a>
            <a href="#contato" className="text-white hover:text-yellow-400 transition-colors">
              Contato
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a
              href={`https://wa.me/554730283351?text=${encodeURIComponent('Vim pelo site! Quero conhecer mais sobre as scooters Denty Eco')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-all shadow-lg shadow-yellow-400/40 font-semibold text-sm"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-yellow-400/30 bg-black/60 backdrop-blur-md">
            <nav className="flex flex-col space-y-4">
              <a href="#inicio" className="text-white hover:text-yellow-400 transition-colors">
                Início
              </a>
              <a href="#quem-somos" className="text-white hover:text-yellow-400 transition-colors">
                Quem Somos
              </a>
              <a href="#modelos" className="text-white hover:text-yellow-400 transition-colors">
                Modelos
              </a>
              <a href="#beneficios" className="text-white hover:text-yellow-400 transition-colors">
                Benefícios
              </a>
              <a href="#servicos" className="text-white hover:text-yellow-400 transition-colors">
                Serviços
              </a>
              <a href="#contato" className="text-white hover:text-yellow-400 transition-colors">
                Contato
              </a>
              <a
                href={`https://wa.me/554730283351?text=${encodeURIComponent('Vim pelo site! Quero conhecer mais sobre as scooters Denty Eco')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-yellow-400/90 backdrop-blur-md text-black rounded-full hover:bg-yellow-500 transition-all shadow-lg border border-yellow-500/30 text-center"
              >
                Contato
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
