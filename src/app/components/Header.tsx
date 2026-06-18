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
              className="px-6 py-2 bg-yellow-400/90 backdrop-blur-md text-black rounded-full hover:bg-yellow-500 transition-all shadow-lg shadow-yellow-400/50 border border-yellow-500/30"
            >
              Contato
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
