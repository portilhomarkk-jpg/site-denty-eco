// @ts-ignore
import heroImg from '../../imports/image-8.png';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '../utils/api';

interface BannerSlide {
  image: string;
  mobileImage?: string;
  whatsappText: string;
}

const DEFAULT_SLIDES: BannerSlide[] = [
  {
    image: heroImg,
    whatsappText: 'Vim pelo site! Quero conhecer mais sobre as scooters Denty Eco',
  },
];

function SlideBackground({ slide, active }: { slide: BannerSlide; active: boolean }) {
  return (
    <div className={`absolute inset-0 transition-opacity duration-700 ${active ? 'opacity-100' : 'opacity-0'}`}>
      {/* Desktop */}
      {slide.image && (
        <img
          src={slide.image}
          alt=""
          className="hidden sm:block w-full h-full object-cover object-center"
        />
      )}
      {/* Mobile — usa mobileImage se existir, senão usa a imagem principal */}
      {(slide.mobileImage || slide.image) && (
        <img
          src={slide.mobileImage || slide.image}
          alt=""
          className="block sm:hidden w-full h-full object-cover object-center"
        />
      )}
    </div>
  );
}

export function Hero() {
  const [slides, setSlides] = useState<BannerSlide[]>([]);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    api.getBanners()
      .then(data => setSlides(data.length > 0 ? data : DEFAULT_SLIDES))
      .catch(() => setSlides(DEFAULT_SLIDES));
  }, []);

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (slides.length <= 1 || paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [slides.length, paused, next]);

  const slide = slides[current];

  return (
    <section
      id="inicio"
      className={`relative w-full overflow-hidden bg-black transition-opacity duration-500 ${slides.length > 0 ? 'opacity-100' : 'opacity-0'}
        aspect-[4/5] sm:aspect-video sm:max-h-screen`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, i) => (
        <SlideBackground key={i} slide={s} active={i === current} />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20 z-10" />

      <div className="absolute bottom-10 sm:bottom-20 left-0 right-0 z-20 flex justify-center gap-2 sm:gap-4 px-4">
        <a
          href="#modelos"
          className="px-4 py-1.5 sm:px-8 sm:py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all uppercase tracking-wider text-[10px] sm:text-sm shadow-lg shadow-yellow-500/50 whitespace-nowrap"
        >
          Saiba Mais
        </a>
        <a
          href={`https://wa.me/554730283351?text=${encodeURIComponent(slide?.whatsappText || '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-1.5 sm:px-8 sm:py-3 bg-transparent text-white border-2 border-white/80 rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-wider text-[10px] sm:text-sm whitespace-nowrap"
        >
          Contato
        </a>
      </div>

      {slides.length > 1 && (
        <>
          <button onClick={prev} className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/40 hover:bg-yellow-400 text-white hover:text-black rounded-full items-center justify-center transition-all border border-white/20">
            <ChevronLeft size={20} />
          </button>
          <button onClick={next} className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/40 hover:bg-yellow-400 text-white hover:text-black rounded-full items-center justify-center transition-all border border-white/20">
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {slides.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`transition-all rounded-full ${i === current ? 'w-6 sm:w-8 h-2.5 bg-yellow-400' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
