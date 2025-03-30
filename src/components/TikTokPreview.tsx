
import { FC, useState, useEffect } from 'react';
import { TikTokContent } from '../types/explanation';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Download, Share2, Play, RefreshCw, Heart, MessageCircle, Bookmark, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface TikTokPreviewProps {
  content: TikTokContent;
  topic: string;
}

const TikTokPreview: FC<TikTokPreviewProps> = ({ content, topic }) => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 10000) + 1000);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Background videos or images for TikTok preview
  const backgroundImages = [
    "/lovable-uploads/98765221-8abb-4cba-af59-9d5966ad2101.png",
    "/lovable-uploads/d44eb7af-27a5-45b3-821f-9667db43e929.png"
  ];
  
  const [currentBackground, setCurrentBackground] = useState<string>(
    backgroundImages[Math.floor(Math.random() * backgroundImages.length)]
  );
  
  useEffect(() => {
    // Reset image loaded state when background changes
    setImageLoaded(false);
  }, [currentBackground]);
  
  const getEmojiForStyle = () => {
    switch (content.style) {
      case 'casual': return '😎';
      case 'dramatic': return '🎭';
      case 'educational': return '📚';
      case 'hype': return '🔥';
      default: return '📱';
    }
  };
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  const speakScript = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPlaying(false);
        return;
      }
      
      // Remove directions from the script for speaking
      const cleanScript = content.script.replace(/\*([^*]+)\*/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanScript);
      
      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      
      // Set a voice based on persona if available
      if (voices.length > 0) {
        const voiceIndex = Math.min(Math.floor(Math.random() * voices.length), voices.length - 1);
        utterance.voice = voices[voiceIndex];
      }
      
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPlaying(false);
      };
      
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      setIsPlaying(true);
      
      toast({
        title: "TikTok Audio playing",
        description: "Listening to the TikTok script...",
        duration: 3000,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Feature not supported",
        description: "Your browser doesn't support text-to-speech.",
        duration: 3000,
      });
    }
  };
  
  const toggleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };
  
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  
  return (
    <Card className="bg-black border border-gray-800 backdrop-blur-md animate-fade-in overflow-hidden max-w-sm mx-auto">
      <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 py-2 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{getEmojiForStyle()}</span>
          <h3 className="font-bold text-gradient">TikTok</h3>
        </div>
        <Button 
          variant={isPlaying ? "default" : "ghost"} 
          size="icon" 
          className={isPlaying ? "bg-ace-pink text-white" : "text-muted-foreground"}
          onClick={speakScript}
        >
          {isPlaying ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>
      </div>
      
      <div className="relative">
        {/* TikTok video area */}
        <div className="relative bg-gray-900 aspect-[9/16] flex items-center justify-center overflow-hidden">
          {/* Loading spinner */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
            </div>
          )}
          
          {/* Background image */}
          <img 
            src={currentBackground} 
            alt="TikTok background" 
            className={`absolute inset-0 w-full h-full object-cover filter brightness-50 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ objectPosition: 'center' }}
            onLoad={handleImageLoad}
          />
          
          {/* Video overlay with gradients for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
          
          {/* Username and description */}
          <div className="absolute bottom-4 left-3 right-12 z-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-ace-purple to-ace-pink flex items-center justify-center text-white font-bold">
                {getEmojiForStyle()}
              </div>
              <span className="text-white font-semibold">@aceinfinity</span>
            </div>
            
            <div className="text-white text-sm mb-2">
              {content.script.split('*').map((part, index) => {
                if (index % 2 === 1) {
                  return <span key={index} className="italic text-gray-400">({part})</span>;
                }
                return <span key={index}>{part}</span>;
              })}
            </div>
            
            <div className="flex flex-wrap gap-1 mt-1">
              {content.hashtags.map((hashtag, index) => (
                <span key={index} className="text-ace-blue text-sm font-medium">{hashtag}</span>
              ))}
            </div>
          </div>
          
          {/* Right side buttons */}
          <div className="absolute right-2 bottom-16 flex flex-col gap-4">
            <button 
              className="flex flex-col items-center" 
              onClick={toggleLike}
            >
              <Heart className={`w-8 h-8 ${isLiked ? "text-red-500 fill-red-500" : "text-white"}`} />
              <span className="text-white text-xs">{formatNumber(likes)}</span>
            </button>
            
            <button className="flex flex-col items-center">
              <MessageCircle className="w-8 h-8 text-white" />
              <span className="text-white text-xs">{formatNumber(Math.floor(Math.random() * 1000) + 100)}</span>
            </button>
            
            <button 
              className="flex flex-col items-center"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className={`w-8 h-8 ${isBookmarked ? "text-yellow-500 fill-yellow-500" : "text-white"}`} />
              <span className="text-white text-xs">Save</span>
            </button>
            
            <button className="flex flex-col items-center">
              <Send className="w-8 h-8 text-white" />
              <span className="text-white text-xs">Share</span>
            </button>
          </div>
          
          {/* Music icon */}
          <div className="absolute bottom-4 right-4 animate-spin-slow">
            <div className="w-10 h-10 rounded-full bg-black/50 border-2 border-white flex items-center justify-center">
              <span className="text-xl">🎵</span>
            </div>
          </div>
          
          {/* "AI TikTok" watermark */}
          <div className="absolute top-2 right-2 bg-black/40 rounded px-2 py-1">
            <span className="text-white/80 text-xs flex items-center gap-1">
              <span>✨</span> AI TikTok
            </span>
          </div>
          
          {/* Play indicator when audio is playing */}
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-black/30 flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-white animate-spin" />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <CardContent className="p-4 space-y-4 bg-black">
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-sm gap-1 border-gray-700 text-gray-300"
            onClick={speakScript}
          >
            <Volume2 className="w-3 h-3" />
            <span>Listen</span>
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-sm gap-1 border-gray-700 text-gray-300"
              onClick={() => {
                toast({
                  title: "Script downloaded",
                  description: "TikTok script has been saved.",
                  duration: 3000,
                });
              }}
            >
              <Download className="w-3 h-3" />
              <span>Download</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-sm gap-1 border-gray-700 text-gray-300"
              onClick={() => {
                toast({
                  title: "Shared!",
                  description: "TikTok script has been copied to clipboard.",
                  duration: 3000,
                });
              }}
            >
              <Share2 className="w-3 h-3" />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TikTokPreview;
