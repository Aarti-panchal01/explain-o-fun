
import { FC } from 'react';
import { MemeContent } from '../types/explanation';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, RefreshCw } from "lucide-react";

interface MemeGeneratorProps {
  content: MemeContent;
  topic: string;
}

const MemeGenerator: FC<MemeGeneratorProps> = ({ content, topic }) => {
  return (
    <Card className="bg-secondary/30 border border-muted backdrop-blur-md animate-fade-in">
      <div className="bg-gradient-to-r from-ace-orange/20 to-ace-pink/20 py-2 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎭</span>
          <h3 className="font-bold text-gradient">AI Meme</h3>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>
      <CardContent className="p-4 space-y-4">
        <div className="relative bg-black/50 rounded-lg overflow-hidden aspect-square max-w-xs mx-auto">
          <div className="absolute inset-x-0 top-0 p-2 text-center text-white font-bold uppercase text-lg">
            {content.topText}
          </div>
          <div className="absolute inset-x-0 bottom-0 p-2 text-center text-white font-bold uppercase text-lg">
            {content.bottomText}
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-white/70">
            <p className="text-center">AI generated meme image will appear here</p>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-sm gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Regenerate</span>
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-sm gap-1"
            >
              <Download className="w-3 h-3" />
              <span>Download</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-sm gap-1"
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
