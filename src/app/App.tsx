import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Models } from './components/Models';
import { Benefits } from './components/Benefits';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { Login } from './admin/Login';
import { Dashboard } from './admin/Dashboard';
import { SEO } from './components/SEO';
import { TrackingScripts } from './components/TrackingScripts';
import { WhatsAppButton } from './components/WhatsAppButton';
import { LocalSEO } from './components/LocalSEO';
import { ModelPage } from './components/ModelPage';

function HomePage() {
  return (
    <div className="min-h-screen">
      <SEO />
      <TrackingScripts />
      <Header />
      <Hero />
      <About />
      <Models />
      <Benefits />
      <Services />
      <Testimonials />
      <LocalSEO />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function AppContent() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  if (currentPath === '/admin/dashboard') {
    if (!isAuthenticated) {
      navigate('/admin');
      return <Login />;
    }
    return <Dashboard />;
  }

  if (currentPath === '/admin') {
    return <Login />;
  }

  // Rota de detalhe do modelo: /modelos/:id
  if (currentPath.startsWith('/modelos/')) {
    const modelId = currentPath.replace('/modelos/', '');
    return <ModelPage modelId={modelId} />;
  }

  return <HomePage />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}