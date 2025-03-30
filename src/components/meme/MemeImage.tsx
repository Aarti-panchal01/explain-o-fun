
import { FC } from 'react';

interface MemeImageProps {
  topText: string;
  bottomText: string;
  bgGradient: string;
  onImageLoad?: () => void;
  onImageError?: () => void;
}

const MemeImage: FC<MemeImageProps> = ({ 
  topText, 
  bottomText, 
  bgGradient,
  onImageLoad,
  onImageError
}) => {
  // Create a random rotation for meme text to make it more dynamic
  const getRandomRotation = () => {
    return Math.random() > 0.5 ? `rotate-${Math.ceil(Math.random() * 2)}` : `-rotate-${Math.ceil(Math.random() * 2)}`;
  };

  // Get random styling for meme text
  const getTextEffect = () => {
    const effects = [
      'drop-shadow-xl',
      'animate-pulse',
      'scale-105',
      'italic',
    ];
    return effects[Math.floor(Math.random() * effects.length)];
  };
  
  return (
    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden aspect-video max-w-md mx-auto transition-all duration-300 transform hover:scale-105 p-4 shadow-xl border border-gray-700/50">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-40 animate-breathe`}></div>
      
      {/* Pattern overlay for more texture */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiPjwvcmVjdD4KPC9zdmc+')]"></div>
      
      {/* Text-only meme content */}
      <div className="relative flex flex-col items-center justify-between h-full p-6 z-10">
        {/* Top text */}
        <div className="w-full text-center">
          <p className={`meme-text text-white font-extrabold uppercase text-xl md:text-3xl text-shadow-lg tracking-wider ${getRandomRotation()} ${getTextEffect()}`}>
            {topText.toUpperCase()}
          </p>
        </div>
        
        {/* Bottom text */}
        <div className="w-full text-center">
          <p className={`meme-text text-white font-extrabold uppercase text-xl md:text-3xl text-shadow-lg tracking-wider ${getRandomRotation()} ${getTextEffect()}`}>
            {bottomText.toUpperCase()}
          </p>
        </div>
      </div>
      
      {/* Meme watermark */}
      <div className="absolute bottom-1 right-2 text-xs text-white/30">
        AceInfinity™
      </div>
    </div>
  );
};

export default MemeImage;
