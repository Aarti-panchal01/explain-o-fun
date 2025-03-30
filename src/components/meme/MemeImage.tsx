
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
  return (
    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden aspect-video max-w-md mx-auto transition-all duration-300 transform hover:scale-105 p-4">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-30`}></div>
      
      {/* Text-only meme content */}
      <div className="relative flex flex-col items-center justify-between h-full p-6 z-10">
        {/* Top text */}
        <div className="w-full text-center">
          <p className="meme-text text-white font-bold uppercase text-xl md:text-2xl text-shadow-lg tracking-wider">
            {topText}
          </p>
        </div>
        
        {/* Bottom text */}
        <div className="w-full text-center">
          <p className="meme-text text-white font-bold uppercase text-xl md:text-2xl text-shadow-lg tracking-wider">
            {bottomText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemeImage;
