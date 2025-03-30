
import { FC, useState, useRef } from 'react';
import { MemeContent } from '../types/explanation';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, RefreshCw, ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MemeImage from './meme/MemeImage';
import { getRandomTemplate, processTemplate } from '../data/memeTemplates';
import { getRandomGradient } from '../utils/memeUtils';

interface MemeGeneratorProps {
  content: MemeContent;
  topic: string;
}

const MemeGenerator: FC<MemeGeneratorProps> = ({ content: initialContent, topic }) => {
  const [content, setContent] = useState<MemeContent>(initialContent);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const { toast } = useToast();
  const memeRef = useRef<HTMLDivElement>(null);
  const [bgGradient, setBgGradient] = useState(getRandomGradient());
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 500) + 100);
  const [isLiked, setIsLiked] = useState(false);
  const [funnyMeter, setFunnyMeter] = useState(Math.floor(Math.random() * 100));
  
  const funnyTags = [
    "That's what she said!",
    "Mom's spaghetti",
    "No cap, fr fr",
    "This is peak comedy",
    "Literally me"
  ];
  
  const regenerateMeme = () => {
    setIsRegenerating(true);
    
    // Get a random template different from the current one
    const newTemplate = getRandomTemplate(content.topText, content.bottomText, topic);
    const processedTemplate = processTemplate(newTemplate, topic);
    
    // Simulate loading
    setTimeout(() => {
      setContent({
        ...content,
        topText: processedTemplate.topText,
        bottomText: processedTemplate.bottomText
      });
      setBgGradient(getRandomGradient());
      setIsRegenerating(false);
      setFunnyMeter(Math.floor(Math.random() * 100));
      
      toast({
        title: "Even funnier meme generated!",
        description: "Your new AI meme is ready to make people laugh.",
        duration: 2000,
      });
    }, 800);
  };

  const handleShareMeme = () => {
    navigator.clipboard.writeText(`${content.topText}\n\n${content.bottomText}`);
    toast({
      title: "Meme copied to clipboard",
      description: "Your AI meme text has been copied. Go spread the laughter!",
      duration: 3000,
    });
  };

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
      toast({
        title: "You liked this meme!",
        description: "Thanks for appreciating the humor!",
        duration: 1500,
      });
    }
    setIsLiked(!isLiked);
  };
  
  return (
    <Card className="bg-secondary/30 border border-muted backdrop-blur-md animate-fade-in">
      <div className="bg-gradient-to-r from-ace-orange/20 to-ace-pink/20 py-2 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎭</span>
          <h3 className="font-bold text-gradient">AI Meme Generator</h3>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="h-2 w-20 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full ${funnyMeter > 75 ? 'bg-green-500' : funnyMeter > 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${funnyMeter}%` }}
            ></div>
          </div>
          <span className="text-muted-foreground">Funny-o-meter</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className={`text-muted-foreground ${isRegenerating ? 'animate-spin' : ''}`}
          onClick={regenerateMeme}
          disabled={isRegenerating}
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>
      <CardContent className="p-4 space-y-4">
        <div ref={memeRef}>
          <MemeImage
            topText={content.topText}
            bottomText={content.bottomText}
            bgGradient={bgGradient}
          />
        </div>
        
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-sm gap-1"
              onClick={regenerateMeme}
              disabled={isRegenerating}
            >
              <RefreshCw className={`w-3 h-3 ${isRegenerating ? 'animate-spin' : ''}`} />
              <span>Make it funnier</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className={`text-sm gap-1 ${isLiked ? 'text-pink-500' : ''}`}
              onClick={handleLike}
            >
              <ThumbsUp className={`w-3 h-3 ${isLiked ? 'fill-pink-500' : ''}`} />
              <span>{likeCount}</span>
            </Button>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-sm gap-1"
              onClick={() => {
                navigator.clipboard.writeText(`${content.topText}\n\n${content.bottomText}`);
                toast({
                  title: "Meme saved",
                  description: "Your AI meme has been copied to clipboard.",
                  duration: 3000,
                });
              }}
            >
              <Download className="w-3 h-3" />
              <span>Save</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-sm gap-1"
              onClick={handleShareMeme}
            >
              <Share2 className="w-3 h-3" />
              <span>Share</span>
            </Button>
          </div>
        </div>
        
        {/* Random funny tag */}
        <div className="text-xs text-center text-muted-foreground italic">
          "{funnyTags[Math.floor(Math.random() * funnyTags.length)]}"
        </div>
      </CardContent>
      <style dangerouslySetInnerHTML={{
        __html: `
          .text-shadow-lg {
            text-shadow: 
              -2px -2px 0 #000,  
              2px -2px 0 #000,
              -2px 2px 0 #000,
              2px 2px 0 #000,
              0 3px 0 #000;
          }
        `
      }} />
    </Card>
  );
};

export default MemeGenerator;
