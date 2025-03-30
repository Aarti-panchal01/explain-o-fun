
import { FC, useState } from 'react';

interface MemeImageProps {
  imageUrl: string;
  topText: string;
  bottomText: string;
  bgGradient: string;
  onImageLoad: () => void;
  onImageError: () => void;
}

const MemeImage: FC<MemeImageProps> = ({ 
  imageUrl, 
  topText, 
  bottomText, 
  bgGradient,
  onImageLoad,
  onImageError
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    onImageLoad();
  };

  const handleImageError = () => {
    console.error("Failed to load image:", imageUrl);
    onImageError();
  };

  return (
    <div className="relative bg-black/50 rounded-lg overflow-hidden aspect-square max-w-xs mx-auto transition-all duration-300 transform hover:scale-105">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-20`}></div>
      
      {/* Actual meme image */}
      <div className="absolute inset-0 flex items-center justify-center">
        {!imageLoaded && (
          <div className="w-full h-full flex items-center justify-center bg-gray-900/70">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        )}
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt="AI generated meme" 
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </div>
      
      {/* Meme text */}
      <div className="absolute inset-x-0 top-4 p-2 text-center z-10">
        <p className="meme-text text-white font-bold uppercase text-lg md:text-xl text-shadow-lg">
          {topText}
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-4 p-2 text-center z-10">
        <p className="meme-text text-white font-bold uppercase text-lg md:text-xl text-shadow-lg">
          {bottomText}
        </p>
      </div>
    </div>
  );
};

export default MemeImage;
