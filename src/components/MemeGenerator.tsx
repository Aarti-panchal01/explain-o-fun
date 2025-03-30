
import { FC, useState, useRef, useEffect } from 'react';
import { MemeContent } from '../types/explanation';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, RefreshCw, ThumbsUp, Sparkles, Twitter, Instagram } from "lucide-react";
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
  const [isSharing, setIsSharing] = useState(false);
  const { toast } = useToast();
  const memeRef = useRef<HTMLDivElement>(null);
  const [bgGradient, setBgGradient] = useState(getRandomGradient());
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 500) + 100);
  const [isLiked, setIsLiked] = useState(false);
  const [funnyMeter, setFunnyMeter] = useState(Math.floor(Math.random() * 100));
  const [viralityScore, setViralityScore] = useState(Math.floor(Math.random() * 50) + 50);
  
  // Enhanced funny tags with more viral humor
  const funnyTags = [
    "That's what she said!",
    "Mom's spaghetti",
    "No cap, fr fr",
    "This is peak comedy",
    "Literally me",
    "Not sure if genius or sleep-deprived",
    "My last brain cell trying its best",
    "When in doubt, meme it out",
    "If this doesn't go viral, nothing will",
    "The internet's new personality just dropped", 
    "This meme passed the vibe check",
    "CEO of explaining complicated stuff",
    "Tell me you don't understand without telling me",
    "POV: you're learning something new",
    "Nobody: Absolutely nobody: Me with my new knowledge:"
  ];
  
  // Randomly select a funny tag on component mount or regeneration
  const [currentFunnyTag, setCurrentFunnyTag] = useState('');
  
  useEffect(() => {
    setCurrentFunnyTag(funnyTags[Math.floor(Math.random() * funnyTags.length)]);
  }, [content]);
  
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
      setViralityScore(Math.floor(Math.random() * 50) + 50);
      
      toast({
        title: "Even funnier meme generated!",
        description: "Your new AI meme is ready to make people laugh.",
        duration: 2000,
      });
    }, 800);
  };

  const handleShareMeme = (platform: 'clipboard' | 'twitter' | 'instagram') => {
    setIsSharing(true);
    
    // Simulate sharing to different platforms
    setTimeout(() => {
      let message = '';
      
      switch(platform) {
        case 'clipboard':
          navigator.clipboard.writeText(`${content.topText}\n\n${content.bottomText}\n\n#Explainofun #${topic.replace(/\s+/g, '')}`);
          message = "Meme copied to clipboard! Go spread the laughter!";
          break;
        case 'twitter':
          message = "Ready to share on Twitter! Opening share dialog...";
          // In a real implementation, we would open Twitter's sharing dialog
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${content.topText}\n${content.bottomText}\n\n#Explainofun #${topic.replace(/\s+/g, '')}`)}`, '_blank');
          break;
        case 'instagram':
          message = "Ready for Instagram! Save the image to share to your stories!";
          break;
      }
      
      toast({
        title: "Sharing your meme",
        description: message,
        duration: 3000,
      });
      
      setIsSharing(false);
    }, 1000);
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
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-xs">
              <span className="text-muted-foreground">Funny-o-meter</span>
              <div className="h-2 w-20 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${funnyMeter > 75 ? 'bg-green-500' : funnyMeter > 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${funnyMeter}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs mt-1">
              <span className="text-muted-foreground">Virality</span>
              <div className="h-2 w-20 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  style={{ width: `${viralityScore}%` }}
                ></div>
              </div>
            </div>
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
              <Sparkles className="w-3 h-3 text-yellow-500" />
              <span>Make it viral</span>
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
              onClick={() => handleShareMeme('twitter')}
              disabled={isSharing}
            >
              <Twitter className="w-3 h-3 text-blue-400" />
              <span>Twitter</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-sm gap-1"
              onClick={() => handleShareMeme('instagram')}
              disabled={isSharing}
            >
              <Instagram className="w-3 h-3 text-pink-500" />
              <span>Instagram</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-sm gap-1"
              onClick={() => handleShareMeme('clipboard')}
              disabled={isSharing}
            >
              <Share2 className="w-3 h-3" />
              <span>Copy</span>
            </Button>
          </div>
        </div>
        
        {/* Random funny tag */}
        <div className="text-xs text-center text-muted-foreground italic">
          "{currentFunnyTag}"
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
