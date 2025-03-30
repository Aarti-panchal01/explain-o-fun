
import { FC, useState, useRef } from 'react';
import { MemeContent } from '../types/explanation';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
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
      
      toast({
        title: "Meme regenerated!",
        description: "Your new AI meme is ready.",
        duration: 3000,
      });
    }, 800);
  };

  const handleShareMeme = () => {
    navigator.clipboard.writeText(`${content.topText}\n\n${content.bottomText}`);
    toast({
      title: "Meme copied to clipboard",
      description: "Your AI meme text has been copied.",
      duration: 3000,
    });
  };
  
  return (
    <Card className="bg-secondary/30 border border-muted backdrop-blur-md animate-fade-in">
      <div className="bg-gradient-to-r from-ace-orange/20 to-ace-pink/20 py-2 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎭</span>
          <h3 className="font-bold text-gradient">AI Meme</h3>
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
          <Button 
            variant="outline" 
            size="sm" 
            className="text-sm gap-1"
            onClick={regenerateMeme}
            disabled={isRegenerating}
          >
            <RefreshCw className={`w-3 h-3 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>Regenerate</span>
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-sm gap-1"
              onClick={() => {
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
