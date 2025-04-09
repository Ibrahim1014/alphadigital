
/// <reference types="vite/client" />

// Types pour l'API SoundCloud
interface SCWidget {
  play: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
  getVolume: (callback: (volume: number) => void) => void;
  bind: (event: string, callback: () => void) => void;
}

declare global {
  interface Window {
    SC: {
      Widget: (iframe: HTMLIFrameElement) => SCWidget;
    }
  }
}
