import { useState } from 'react';
import { X, User, Phone, MessageCircle } from 'lucide-react';
import { api } from '../utils/api';

const WA_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Vim pelo site! Meu nome é ${name} e quero conhecer mais sobre as scooters Denty Eco.`;
    api.addLead({ name, phone, message }).catch(console.error);
    setSubmitted(true);
    setTimeout(() => {
      window.open(`https://wa.me/554730283351?text=${encodeURIComponent(message)}`, '_blank');
      setOpen(false);
      setSubmitted(false);
      setName('');
      setPhone('');
    }, 800);
  };

  const handleClose = () => {
    setOpen(false);
    setName('');
    setPhone('');
    setSubmitted(false);
  };

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg shadow-green-500/40 hover:shadow-green-500/60 transition-all group"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
          {WA_SVG}
        </div>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap pr-0 group-hover:pr-4 text-sm">
          Fale conosco
        </span>
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

          {/* Card */}
          <div className="relative w-full max-w-sm bg-gray-900 border border-green-500/30 rounded-3xl shadow-2xl shadow-green-500/20 overflow-hidden">

            {/* Header verde */}
            <div className="bg-gradient-to-r from-green-600 to-green-500 px-6 py-5 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                {WA_SVG}
              </div>
              <div>
                <p className="text-white font-medium">Denty Eco</p>
                <p className="text-green-100 text-sm">Normalmente responde em minutos</p>
              </div>
              <button onClick={handleClose} className="ml-auto text-white/70 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-6">
              {!submitted ? (
                <>
                  <p className="text-gray-300 text-sm mb-5">
                    Deixe seu contato e te atendemos pelo WhatsApp agora mesmo! 👋
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-400 mb-1.5 block">Seu nome</label>
                      <div className="relative">
                        <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Como podemos te chamar?"
                          required
                          className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 mb-1.5 block">Seu WhatsApp</label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(formatPhone(e.target.value))}
                          placeholder="(47) 99999-9999"
                          required
                          className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all shadow-lg shadow-green-500/30 text-sm"
                    >
                      <MessageCircle size={18} />
                      Iniciar conversa
                    </button>
                  </form>

                  <p className="text-center text-xs text-gray-600 mt-4">
                    Seus dados não serão compartilhados com terceiros.
                  </p>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mb-3">
                    {WA_SVG}
                  </div>
                  <p className="text-white mb-1">Abrindo WhatsApp...</p>
                  <p className="text-gray-400 text-sm">Te redirecionando agora 🚀</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
