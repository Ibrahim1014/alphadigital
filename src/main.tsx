
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import App from './App.tsx'
import './index.css'

// Composant de fallback simple pour les erreurs générales
const GeneralErrorFallback = () => {
  return (
    <div className="min-h-screen bg-alpha-black text-alpha-white flex items-center justify-center">
      <div className="glass p-8 rounded-lg max-w-md">
        <h2 className="text-2xl font-bold mb-4">Une erreur s'est produite</h2>
        <p className="text-alpha-gray mb-4">
          Nous sommes désolés, une erreur inattendue est survenue lors du chargement de la page.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-alpha-gold text-alpha-black px-4 py-2 rounded hover:opacity-90"
        >
          Rafraîchir la page
        </button>
      </div>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary 
    FallbackComponent={GeneralErrorFallback}
    onError={(error) => console.error("Erreur d'application générale:", error)}
  >
    <App />
  </ErrorBoundary>
);
