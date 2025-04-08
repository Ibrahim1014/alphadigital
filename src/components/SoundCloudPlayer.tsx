
import React from 'react';

interface SoundCloudPlayerProps {
  url: string;
  title?: string; // Ajout de la propriété title comme optionnelle
}

export const SoundCloudPlayer: React.FC<SoundCloudPlayerProps> = ({ url }) => {
  // S'assurer que les contrôles audio sont bien activés
  return (
    <div className="w-full h-full bg-alpha-black/50 backdrop-blur-md rounded-xl overflow-hidden border border-alpha-gold/20">
      <iframe
        width="100%"
        height="100%"
        allow="autoplay; encrypted-media"
        src={`https://w.soundcloud.com/player/?url=${url}&color=%23FFD700&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`}
        frameBorder="0"
        title="SoundCloud Player"
        loading="lazy"
        className="w-full h-full"
      ></iframe>
    </div>
  );
};
