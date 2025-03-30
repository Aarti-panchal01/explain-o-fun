
import { FC, useState } from 'react';
import { TikTokContent } from '../types/explanation';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Download, Share2, Play, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface TikTokPreviewProps {
  content: TikTokContent;
  topic: string;
}

const TikTokPreview: FC<TikTokPreviewProps> = ({ content, topic }) => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const getEmojiForStyle = () => {
    switch (content.style) {
      case 'casual': return '😎';
      case 'dramatic': return '🎭';
      case 'educational': return '📚';
      case 'hype': return '🔥';
      default: return '📱';
    }
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
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content.script);
    toast({
      title: "Copied to clipboard",
      description: "TikTok script has been copied.",
      duration: 3000,
    });
  };
  
  return (
    <Card className="bg-gradient-to-br from-pink-950/80 to-purple-950/80 border border-pink-900/30 backdrop-blur-md animate-fade-in overflow-hidden max-w-md mx-auto text-white">
      <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 py-2 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{getEmojiForStyle()}</span>
          <h3 className="font-bold text-gradient">TikTok Script</h3>
        </div>
        <Button 
          variant={isPlaying ? "default" : "ghost"} 
          size="icon" 
          className={isPlaying ? "bg-pink-500 text-white" : "text-muted-foreground"}
          onClick={speakScript}
        >
          {isPlaying ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>
      </div>
      
      <CardContent className="p-6">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
              {getEmojiForStyle()}
            </div>
            <span className="text-white font-semibold text-sm">@aceinfinity</span>
          </div>
          
          <div className="bg-pink-950/30 p-4 rounded-lg border border-pink-900/30 mb-3">
            {content.script.split('*').map((part, index) => {
              // If this is a stage direction (odd index)
              if (index % 2 === 1) {
                return <span key={index} className="italic text-pink-300 block my-2">({part})</span>;
              }
              // Regular text (even index)
              return <span key={index} className="text-white">{part}</span>;
            })}
          </div>
          
          <div className="flex flex-wrap gap-1 mt-3">
            {content.hashtags.map((hashtag, index) => (
              <span key={index} className="text-blue-400 text-sm font-medium">{hashtag}</span>
            ))}
          </div>
        </div>
        
        {/* Right side controls */}
        <div className="flex justify-between items-center pt-2 border-t border-pink-900/30 mt-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-sm gap-1 text-pink-200 hover:text-white hover:bg-pink-800/50"
            onClick={speakScript}
          >
            <Volume2 className="w-3 h-3" />
            <span>Listen</span>
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sm gap-1 text-pink-200 hover:text-white hover:bg-pink-800/50"
              onClick={() => {
                navigator.clipboard.writeText(content.script);
                toast({
                  title: "Script copied",
                  description: "TikTok script has been copied to clipboard.",
                  duration: 3000,
                });
              }}
            >
              <Download className="w-3 h-3" />
              <span>Save</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sm gap-1 text-pink-200 hover:text-white hover:bg-pink-800/50"
              onClick={copyToClipboard}
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
