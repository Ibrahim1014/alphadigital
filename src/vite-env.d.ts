
/// <reference types="vite/client" />

// Interface pour l'API SoundCloud
interface SCWidget {
  play: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
  getVolume: (callback: (volume: number) => void) => void;
  bind: (event: string, callback: () => void) => void;
}

// Déclaration globale pour éviter les erreurs TS
declare global {
  interface Window {
    SC?: {
      Widget: (iframe: HTMLIFrameElement) => SCWidget;
      Widget: {
        Events: {
          READY: string;
          PLAY: string;
          PAUSE: string;
          FINISH: string;
        };
      }
    }
  }
}
