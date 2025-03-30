import { FC, useState, useEffect, useRef } from 'react';
import { MemeContent } from '../types/explanation';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import html2canvas from 'html2canvas';

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
  
  // List of meme templates with different top and bottom texts
  const memeTemplates = [
    {
      topText: `WHEN SOMEONE ASKS ABOUT ${topic.toUpperCase()}`,
      bottomText: "ME: *EXPLAINS WITH ADVANCED SCIENCE*",
      image: "/lovable-uploads/98765221-8abb-4cba-af59-9d5966ad2101.png"
    },
    {
      topText: `${topic.toUpperCase()}? OH YOU MEAN`,
      bottomText: "THAT THING NOBODY UNDERSTANDS",
      image: "/lovable-uploads/d44eb7af-27a5-45b3-821f-9667db43e929.png"
    },
    {
      topText: `TRYING TO UNDERSTAND ${topic.toUpperCase()}`,
      bottomText: "MY BRAIN: UNDERSTANDABLE, HAVE A NICE DAY",
      image: "/lovable-uploads/98765221-8abb-4cba-af59-9d5966ad2101.png"
    },
    {
      topText: `TEACHER: EXPLAIN ${topic.toUpperCase()}`,
      bottomText: "ME: *PANICS IN CONFUSION*",
      image: "/lovable-uploads/d44eb7af-27a5-45b3-821f-9667db43e929.png"
    },
    {
      topText: `NOBODY: ABSOLUTELY NOBODY:`,
      bottomText: `ME: LET ME TELL YOU ABOUT ${topic.toUpperCase()}`,
      image: "/lovable-uploads/98765221-8abb-4cba-af59-9d5966ad2101.png"
    },
    {
      topText: `THEY SAID ${topic.toUpperCase()} WAS SIMPLE`,
      bottomText: "THEY LIED",
      image: "/lovable-uploads/93923333-0797-4f95-b898-b9e8583476fb.png"
    },
    {
      topText: `WHAT IS AI?? OH YOU MEAN`,
      bottomText: "THAT THING NOBODY UNDERSTANDS",
      image: "/lovable-uploads/6628eab6-74f2-479d-b393-b54266c3c6cd.png"
    },
    {
      topText: `EXPLAINING WHAT IS ${topic.toUpperCase()}?`,
      bottomText: `LIKE A DISTINGUISHED PROFESSOR`,
      image: "/lovable-uploads/c08b02c6-65f6-4d2c-ab9a-ef1037575f93.png"
    }
  ];
  
  // Function to generate random background color
  const getRandomGradient = () => {
    const gradients = [
      'from-blue-500 to-purple-500',
      'from-green-400 to-blue-500',
      'from-yellow-400 to-orange-500',
      'from-pink-500 to-red-500',
      'from-purple-500 to-indigo-500',
      'from-indigo-500 to-blue-400',
      'from-red-500 to-orange-400',
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };
  
  // Initialize current meme image
  const [currentMemeImage, setCurrentMemeImage] = useState<string>("");
  
  // Function to find the correct image for the current meme text
  const findImageForMemeText = (topText: string, bottomText: string) => {
    const template = memeTemplates.find(template => 
      template.topText === topText && template.bottomText === bottomText);
    
    return template ? template.image : memeTemplates[0].image;
  };
  
  useEffect(() => {
    // Set initial meme image based on content
    const image = findImageForMemeText(content.topText, content.bottomText);
    console.log("Setting initial meme image:", image);
    setCurrentMemeImage(image);
    // Reset image loaded state to trigger loading spinner
    setImageLoaded(false);
  }, [content.topText, content.bottomText]);
  
  const regenerateMeme = () => {
    setIsRegenerating(true);
    setImageLoaded(false);
    
    // Get a random meme template different from current one
    let newTemplateIndex;
    do {
      newTemplateIndex = Math.floor(Math.random() * memeTemplates.length);
    } while (
      memeTemplates[newTemplateIndex].topText === content.topText && 
      memeTemplates[newTemplateIndex].bottomText === content.bottomText
    );
    
    const newTemplate = memeTemplates[newTemplateIndex];
    console.log("Selected new template:", newTemplate);
    
    // Simulate loading
    setTimeout(() => {
      setContent({
        ...content,
        topText: newTemplate.topText,
        bottomText: newTemplate.bottomText
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
  
  const [bgGradient, setBgGradient] = useState(getRandomGradient());
  
  const handleImageLoad = () => {
    console.log("Image loaded successfully:", currentMemeImage);
    setImageLoaded(true);
  };

  const handleImageError = () => {
    console.error("Failed to load image:", currentMemeImage);
    // Fallback to a default image if the current one fails to load
    if (currentMemeImage !== memeTemplates[0].image) {
      setCurrentMemeImage(memeTemplates[0].image);
    } else {
      setImageLoaded(true); // Force show something rather than spinner forever
    }
  };

  const downloadMeme = async () => {
    if (!memeRef.current) return;

    try {
      const canvas = await html2canvas(memeRef.current, {
        allowTaint: true,
        useCORS: true,
        backgroundColor: null,
        scale: 2,
      });
      
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${topic.replace(/\s+/g, '-')}-meme.png`;
      link.href = dataUrl;
      link.click();
      
      toast({
        title: "Meme downloaded",
        description: "Your AI meme has been saved.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error downloading meme:', error);
      toast({
        variant: "destructive",
        title: "Download failed",
        description: "There was a problem saving your meme.",
        duration: 3000,
      });
    }
  };

  const shareMeme = async () => {
    if (!memeRef.current) return;

    try {
      const canvas = await html2canvas(memeRef.current, {
        allowTaint: true,
        useCORS: true, 
        backgroundColor: null,
        scale: 2,
      });
      
      canvas.toBlob(async (blob) => {
        if (!blob) {
          throw new Error('Failed to create blob');
        }
        
        try {
          // Try to use the Web Share API if available
          if (navigator.share) {
            const file = new File([blob], `${topic.replace(/\s+/g, '-')}-meme.png`, { 
              type: 'image/png' 
            });
            
            await navigator.share({
              title: `${topic} Meme`,
              text: 'Check out this AI-generated meme!',
              files: [file]
            });
          } else {
            // Fallback to clipboard
            await navigator.clipboard.write([
              new ClipboardItem({
                'image/png': blob
              })
            ]);
            
            toast({
              title: "Copied to clipboard",
              description: "Your AI meme has been copied to clipboard.",
              duration: 3000,
            });
          }
        } catch (error) {
          console.error('Error sharing:', error);
          // Fallback to downloading if sharing fails
          const dataUrl = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.download = `${topic.replace(/\s+/g, '-')}-meme.png`;
          link.href = dataUrl;
          link.click();
          
          toast({
            title: "Meme downloaded instead",
            description: "Sharing failed, but we saved your meme as a file.",
            duration: 3000,
          });
        }
      }, 'image/png');
    } catch (error) {
      console.error('Error preparing to share meme:', error);
      toast({
        variant: "destructive",
        title: "Sharing failed",
        description: "There was a problem sharing your meme.",
        duration: 3000,
      });
    }
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
        <div 
          ref={memeRef}
          className="relative bg-black/50 rounded-lg overflow-hidden aspect-square max-w-xs mx-auto transition-all duration-300 transform hover:scale-105"
        >
          {/* Background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-20`}></div>
          
          {/* Actual meme image */}
          <div className="absolute inset-0 flex items-center justify-center">
            {!imageLoaded && (
              <div className="w-full h-full flex items-center justify-center bg-gray-900/70">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
              </div>
            )}
            {currentMemeImage && (
              <img 
                src={currentMemeImage} 
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
              {content.topText}
            </p>
          </div>
          <div className="absolute inset-x-0 bottom-4 p-2 text-center z-10">
            <p className="meme-text text-white font-bold uppercase text-lg md:text-xl text-shadow-lg">
              {content.bottomText}
            </p>
          </div>
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
              onClick={downloadMeme}
            >
              <Download className="w-3 h-3" />
              <span>Download</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-sm gap-1"
              onClick={shareMeme}
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
