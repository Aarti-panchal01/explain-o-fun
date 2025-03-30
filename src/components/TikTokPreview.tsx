
import { FC } from 'react';
import { TikTokContent } from '../types/explanation';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Download, Share2, Play } from "lucide-react";

interface TikTokPreviewProps {
  content: TikTokContent;
  topic: string;
}

const TikTokPreview: FC<TikTokPreviewProps> = ({ content, topic }) => {
  const getEmojiForStyle = () => {
    switch (content.style) {
      case 'casual': return '😎';
      case 'dramatic': return '🎭';
      case 'educational': return '📚';
      case 'hype': return '🔥';
      default: return '📱';
    }
  };
  
  return (
    <Card className="bg-secondary/30 border border-muted backdrop-blur-md animate-fade-in overflow-hidden">
      <div className="bg-gradient-to-r from-ace-pink/20 to-ace-purple/20 py-2 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{getEmojiForStyle()}</span>
          <h3 className="font-bold text-gradient">TikTok Script</h3>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Play className="w-4 h-4" />
        </Button>
      </div>
      <CardContent className="p-4 space-y-4">
        <div className="glass-effect p-4 rounded-lg text-sm">
          {content.script.split('*').map((part, index) => {
            // If it's an odd index, it's a direction (between * *)
            if (index % 2 === 1) {
              return <span key={index} className="italic text-muted-foreground">({part})</span>;
            }
            return <span key={index}>{part}</span>;
          })}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {content.hashtags.map((hashtag, index) => (
            <span key={index} className="text-ace-blue text-sm font-medium">{hashtag}</span>
          ))}
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-sm gap-1"
          >
            <Volume2 className="w-3 h-3" />
            <span>Listen</span>
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

export default TikTokPreview;
