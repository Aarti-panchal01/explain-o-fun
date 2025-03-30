
import { FC, useState, useEffect, useRef } from 'react';
import { MemeContent } from '../types/explanation';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import MemeImage from './meme/MemeImage';
import { findMatchingTemplate, getRandomTemplate, processTemplate } from '../data/memeTemplates';
import { getRandomGradient, downloadMeme, shareMeme } from '../utils/memeUtils';

interface MemeGeneratorProps {
  content: MemeContent;
  topic: string;
}

const MemeGenerator: FC<MemeGeneratorProps> = ({ content: initialContent, topic }) => {
  const [content, setContent] = useState<MemeContent>(initialContent);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { toast } = useToast();
  const memeRef = useRef<HTMLDivElement>(null);
  
  // Initialize with a template that matches the initial content
  const initialTemplate = findMatchingTemplate(initialContent.topText, initialContent.bottomText);
  const [currentMemeImage, setCurrentMemeImage] = useState(initialTemplate.image);
  const [bgGradient, setBgGradient] = useState(getRandomGradient());
  
  useEffect(() => {
    // Reset image loaded state when component mounts or content changes
    setImageLoaded(false);
    
    // Find template that matches current content
    const matchedTemplate = findMatchingTemplate(content.topText, content.bottomText);
    setCurrentMemeImage(matchedTemplate.image);
  }, [content.topText, content.bottomText]);
  
  const regenerateMeme = () => {
    setIsRegenerating(true);
    setImageLoaded(false);
    
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
      setCurrentMemeImage(newTemplate.image);
      setBgGradient(getRandomGradient());
      setIsRegenerating(false);
      
      toast({
        title: "Meme regenerated!",
        description: "Your new AI meme is ready.",
        duration: 3000,
      });
    }, 800);
  };
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    console.error("Failed to load image:", currentMemeImage);
    // Fallback to a default image if the current one fails to load
    if (currentMemeImage !== initialTemplate.image) {
      setCurrentMemeImage(initialTemplate.image);
    } else {
      setImageLoaded(true); // Force show something rather than spinner forever
    }
  };

  const handleDownloadMeme = () => {
    downloadMeme(
      memeRef.current,
      topic,
      () => {
        toast({
          title: "Meme downloaded",
          description: "Your AI meme has been saved.",
          duration: 3000,
        });
      },
      (error) => {
        toast({
          variant: "destructive",
          title: "Download failed",
          description: "There was a problem saving your meme.",
          duration: 3000,
        });
      }
    );
  };

  const handleShareMeme = () => {
    shareMeme(
      memeRef.current,
      topic,
      () => {
        toast({
          title: "Meme shared",
          description: "Your AI meme has been shared.",
          duration: 3000,
        });
      },
      () => {
        toast({
          title: "Copied to clipboard",
          description: "Your AI meme has been copied to clipboard.",
          duration: 3000,
        });
      },
      () => {
        toast({
          title: "Meme downloaded instead",
          description: "Sharing failed, but we saved your meme as a file.",
          duration: 3000,
        });
      },
      (error) => {
        toast({
          variant: "destructive",
          title: "Sharing failed",
          description: "There was a problem sharing your meme.",
          duration: 3000,
        });
      }
    );
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
            imageUrl={currentMemeImage}
            topText={content.topText}
            bottomText={content.bottomText}
            bgGradient={bgGradient}
            onImageLoad={handleImageLoad}
            onImageError={handleImageError}
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
              onClick={handleDownloadMeme}
            >
              <Download className="w-3 h-3" />
              <span>Download</span>
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
      {/* Fix the style element by using dangerouslySetInnerHTML */}
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
