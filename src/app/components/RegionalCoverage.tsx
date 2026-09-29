import { MapPin, Truck, Phone } from 'lucide-react';

const cities = [
  'Joinville', 'Jaraguá do Sul', 'São Bento do Sul', 'Schroeder',
  'Guaramirim', 'Corupá', 'Campo Alegre', 'Rio Negrinho',
];

export function RegionalCoverage() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <p className="text-yellow-400 text-sm uppercase tracking-widest mb-3">Onde atendemos</p>
          <h2 className="text-3xl md:text-4xl text-white mb-4">
            Scooter Elétrica com Entrega em Joinville e Região
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Vendemos e entregamos scooters elétricas em Joinville e toda a região norte de Santa Catarina. Retire na loja no Comasa ou receba em casa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/5 border border-yellow-500/30 rounded-2xl p-6 text-center">
            <MapPin className="text-yellow-400 mx-auto mb-3" size={28} />
            <h3 className="text-white mb-1">Loja Física</h3>
            <p className="text-gray-400 text-sm">Rua Albano Schmidt, 5268<br />Comasa, Joinville SC</p>
          </div>
          <div className="bg-white/5 border border-yellow-500/30 rounded-2xl p-6 text-center">
            <Truck className="text-yellow-400 mx-auto mb-3" size={28} />
            <h3 className="text-white mb-1">Entrega Regional</h3>
            <p className="text-gray-400 text-sm">Joinville e toda região norte de Santa Catarina</p>
          </div>
          <div className="bg-white/5 border border-yellow-500/30 rounded-2xl p-6 text-center">
            <Phone className="text-yellow-400 mx-auto mb-3" size={28} />
            <h3 className="text-white mb-1">Atendimento</h3>
            <p className="text-gray-400 text-sm">Seg a Sex: 8h às 18h<br />Sáb: 8h às 12h</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-500 text-sm mb-3">Cidades atendidas:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {cities.map((city) => (
              <span
                key={city}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300 text-sm"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
