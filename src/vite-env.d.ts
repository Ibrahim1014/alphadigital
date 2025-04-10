
/// <reference types="vite/client" />

// Interface pour l'API SoundCloud
interface SCWidget {
  play: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
  getVolume: (callback: (volume: number) => void) => void;
  bind: (event: string, callback: () => void) => void;
}

interface SCWidgetStatic {
  Events: {
    READY: string;
    PLAY: string;
    PAUSE: string;
    FINISH: string;
  };
}

// Déclaration globale pour éviter les erreurs TS
declare global {
  interface Window {
    SC?: {
      Widget: ((iframe: HTMLIFrameElement) => SCWidget) & SCWidgetStatic;
    }
  }
}

export {};
