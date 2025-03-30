
import { FC, useState } from 'react';
import { MemeContent } from '../types/explanation';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface MemeGeneratorProps {
  content: MemeContent;
  topic: string;
}

const MemeGenerator: FC<MemeGeneratorProps> = ({ content: initialContent, topic }) => {
  const [content, setContent] = useState<MemeContent>(initialContent);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const { toast } = useToast();
  
  // List of meme templates with different top and bottom texts
  const memeTemplates = [
    {
      topText: `WHEN SOMEONE ASKS ABOUT ${topic.toUpperCase()}`,
      bottomText: "ME: *EXPLAINS WITH ADVANCED SCIENCE*"
    },
    {
      topText: `${topic.toUpperCase()}? OH YOU MEAN`,
      bottomText: "THAT THING NOBODY UNDERSTANDS"
    },
    {
      topText: `TRYING TO UNDERSTAND ${topic.toUpperCase()}`,
      bottomText: "MY BRAIN: UNDERSTANDABLE, HAVE A NICE DAY"
    },
    {
      topText: `TEACHER: EXPLAIN ${topic.toUpperCase()}`,
      bottomText: "ME: *PANICS IN CONFUSION*"
    },
    {
      topText: `NOBODY: ABSOLUTELY NOBODY:`,
      bottomText: `ME: LET ME TELL YOU ABOUT ${topic.toUpperCase()}`
    },
    {
      topText: `THEY SAID ${topic.toUpperCase()} WAS SIMPLE`,
      bottomText: "THEY LIED"
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
  
  const regenerateMeme = () => {
    setIsRegenerating(true);
    
    // Get a random meme template different from current one
    let newTemplate;
    do {
      newTemplate = memeTemplates[Math.floor(Math.random() * memeTemplates.length)];
    } while (newTemplate.topText === content.topText && newTemplate.bottomText === content.bottomText);
    
    // Simulate loading
    setTimeout(() => {
      setContent({
        ...content,
        topText: newTemplate.topText,
        bottomText: newTemplate.bottomText
      });
      setIsRegenerating(false);
      
      toast({
        title: "Meme regenerated!",
        description: "Your new AI meme is ready.",
        duration: 3000,
      });
    }, 800);
  };
  
  const [bgGradient, setBgGradient] = useState(getRandomGradient());
  
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
        <div className="relative bg-black/50 rounded-lg overflow-hidden aspect-square max-w-xs mx-auto transition-all duration-300 transform hover:scale-105">
          {/* Background gradient that changes on regenerate */}
          <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-20`}></div>
          
          {/* Meme text */}
          <div className="absolute inset-x-0 top-4 p-2 text-center">
            <p className="meme-text text-white font-bold uppercase text-lg md:text-xl shadow-text">
              {content.topText}
            </p>
          </div>
          <div className="absolute inset-x-0 bottom-4 p-2 text-center">
            <p className="meme-text text-white font-bold uppercase text-lg md:text-xl shadow-text">
              {content.bottomText}
            </p>
          </div>
          
          {/* Center placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/4 h-3/4 rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-900/50 flex items-center justify-center">
              <p className="text-center text-white/70">AI generated meme image will appear here</p>
            </div>
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
              onClick={() => {
                toast({
                  title: "Meme downloaded",
                  description: "Your AI meme has been saved.",
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
              className="text-sm gap-1"
              onClick={() => {
                toast({
                  title: "Shared!",
                  description: "Your AI meme has been copied to clipboard.",
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

export default MemeGenerator;
