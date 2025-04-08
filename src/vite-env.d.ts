
/// <reference types="vite/client" />

// Types pour l'API SoundCloud
interface SC {
  Widget: (iframe: HTMLIFrameElement) => SCWidget;
}

interface SCWidget {
  play: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
  getVolume: (callback: (volume: number) => void) => void;
  bind: (event: string, callback: () => void) => void;
}

declare global {
  var SC: SC;
}
