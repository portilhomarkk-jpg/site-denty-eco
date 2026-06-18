import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Lock, Mail } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await login(email, password);
    setLoading(false);
    if (error) {
      setError('E-mail ou senha incorretos.');
    } else {
      window.history.pushState({}, '', '/admin/dashboard');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md border border-yellow-500/30 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-yellow-400/10 rounded-2xl mb-4">
            <Lock className="text-yellow-400" size={40} />
          </div>
          <h1 className="text-3xl text-white mb-2">Painel Admin</h1>
          <p className="text-gray-400">Denty Eco</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-2">E-mail</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-white/10 border border-yellow-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
                placeholder="admin@dentyeco.com.br"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-yellow-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg shadow-yellow-500/50 border border-yellow-400 disabled:opacity-60"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
