
import React from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

// Composant de fallback pour les erreurs 3D amélioré
const ThreeDErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="absolute inset-0 bg-alpha-black/80 text-alpha-white flex items-center justify-center z-10">
      <div className="glass-gold p-6 rounded-lg max-w-md text-center">
        <h3 className="text-xl font-bold mb-3 text-alpha-gold">Erreur de rendu 3D</h3>
        <p className="text-alpha-gray mb-4">
          Un problème est survenu lors du chargement des éléments 3D.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 text-left bg-black/50 p-2 rounded text-xs overflow-auto max-h-32">
            <pre>{error.message}</pre>
          </div>
        )}
        <button
          onClick={resetErrorBoundary}
          className="bg-alpha-gold text-alpha-black px-4 py-2 rounded hover:opacity-90"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
};

interface ThreeDErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<FallbackProps>;
}

export const ThreeDErrorBoundary = ({ 
  children, 
  fallback = ThreeDErrorFallback 
}: ThreeDErrorBoundaryProps) => {
  const handleReset = () => {
    console.log("Tentative de récupération du rendu 3D");
    // Force un rafraîchissement du contexte WebGL
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
      if (gl) {
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      }
    }
  };

  return (
    <ErrorBoundary
      FallbackComponent={fallback}
      onReset={handleReset}
      onError={(error) => {
        console.error("Erreur de rendu 3D détectée:", error);
      }}
    >
      {children}
    </ErrorBoundary>
  );
};
