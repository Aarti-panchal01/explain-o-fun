import { FC, useState } from 'react';
import { TikTokContent } from '../types/explanation';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Download, Share2, Play, RefreshCw, Heart, MessageSquare, ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TikTokPreviewProps {
  content: TikTokContent;
  topic: string;
}

const TikTokPreview: FC<TikTokPreviewProps> = ({ content, topic }) => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 10000) + 1000);
  const [isFollowing, setIsFollowing] = useState(false);
  
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
      
      const cleanScript = content.script.replace(/\*([^*]+)\*/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanScript);
      
      const voices = window.speechSynthesis.getVoices();
      
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
  
  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
      toast({
        title: "You liked this TikTok!",
        description: "Thanks for the love ❤️",
        duration: 1500,
      });
    }
    setIsLiked(!isLiked);
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
            <div className="flex flex-col">
              <span className="text-white font-semibold text-sm">@aceinfinity</span>
              <span className="text-xs text-gray-300">{topic.substring(0, 15)}...</span>
            </div>
            <Button
              size="sm"
              variant={isFollowing ? "default" : "outline"}
              className={`ml-auto text-xs px-3 py-1 h-7 ${isFollowing ? 'bg-pink-500 hover:bg-pink-600' : 'border-pink-500 text-pink-400'}`}
              onClick={() => {
                setIsFollowing(!isFollowing);
                toast({
                  title: isFollowing ? "Unfollowed" : "Following @aceinfinity",
                  description: isFollowing ? "You unfollowed this creator" : "You're now following this creator!",
                  duration: 1500,
                });
              }}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
          </div>
          
          <div className="bg-pink-950/30 p-4 rounded-lg border border-pink-900/30 mb-3">
            {content.script.split('*').map((part, index) => {
              if (index % 2 === 1) {
                return <span key={index} className="italic text-pink-300 block my-2">({part})</span>;
              }
              return <span key={index} className="text-white">{part}</span>;
            })}
          </div>
          
          <div className="flex flex-wrap gap-1 mt-3">
            {content.hashtags.map((hashtag, index) => (
              <span key={index} className="text-blue-400 text-sm font-medium">{hashtag}</span>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-pink-900/30 mt-2">
          <div className="flex items-center gap-5">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`text-sm gap-1 p-0 ${isLiked ? 'text-pink-500' : 'text-pink-200 hover:text-white'} hover:bg-transparent`}
              onClick={handleLike}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-pink-500' : ''}`} />
              <span>{likeCount.toLocaleString()}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sm gap-1 p-0 text-pink-200 hover:text-white hover:bg-transparent"
              onClick={() => toast({
                title: "Comments",
                description: "Comments section would open here",
                duration: 1500,
              })}
            >
              <MessageSquare className="w-5 h-5" />
              <span>{Math.floor(Math.random() * 1000) + 100}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sm gap-1 p-0 text-pink-200 hover:text-white hover:bg-transparent"
              onClick={speakScript}
            >
              <Volume2 className="w-5 h-5" />
            </Button>
          </div>
          
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
                  duration: 1500,
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
