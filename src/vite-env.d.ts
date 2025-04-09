
/// <reference types="vite/client" />

// Interface pour l'API SoundCloud
interface SCWidget {
  play: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
  getVolume: (callback: (volume: number) => void) => void;
  bind: (event: string, callback: () => void) => void;
}

interface SoundCloudWidget {
  Events: {
    PLAY: string;
    PAUSE: string;
    FINISH: string;
    READY: string;
  };
  Widget: (iframe: HTMLIFrameElement) => SCWidget;
}

// Déclaration globale pour éviter les erreurs TS
declare global {
  interface Window {
    SC: SoundCloudWidget;
  }
}
