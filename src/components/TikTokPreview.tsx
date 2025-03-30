import { FC, useState } from 'react';
import { TikTokContent } from '../types/explanation';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Download, Share2, Play, RefreshCw, Heart, MessageSquare, BookmarkIcon } from "lucide-react";
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

  const renderScript = () => {
    return (
      <p className="text-white my-1">{content.script.replace(/\*([^*]+)\*/g, '$1')}</p>
    );
  };
  
  return (
    <Card className="bg-[#121212] border-none overflow-hidden max-w-md mx-auto text-white">
      <div className="bg-[#1d1d1d] py-3 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🔥</span>
          <h3 className="font-bold text-white">TikTok</h3>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white"
          onClick={speakScript}
        >
          <Play className="w-4 h-4 fill-white" />
        </Button>
      </div>
      
      <CardContent className="p-0">
        <div className="relative bg-[#121212] min-h-[400px] flex flex-col">
          <div className="flex items-center gap-3 p-4 border-b border-gray-800">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl">
              {getEmojiForStyle()}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-white font-bold">@aceinfinity</span>
                <span className="text-xs text-gray-400">{topic.length > 15 ? topic.substring(0, 15) + '...' : topic}</span>
              </div>
            </div>
            <Button
              size="sm"
              variant={isFollowing ? "default" : "outline"}
              className={`ml-auto text-sm h-8 rounded-full px-4 ${isFollowing ? 'bg-gray-700 hover:bg-gray-600' : 'border border-[#FE2C55] text-[#FE2C55]'}`}
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
          
          <div className="p-4 flex-grow">
            <div className="mb-3">
              {renderScript()}
            </div>
            
            <div className="flex flex-wrap gap-1 mt-3">
              {content.hashtags.map((hashtag, index) => (
                <span key={index} className="text-[#5F9FFF] text-sm font-medium">{hashtag}</span>
              ))}
            </div>
          </div>
          
          <div className="absolute right-3 bottom-20 flex flex-col gap-5">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full bg-transparent w-12 h-12 p-0 flex flex-col items-center`}
              onClick={handleLike}
            >
              <Heart className={`w-8 h-8 ${isLiked ? 'fill-[#FE2C55] text-[#FE2C55]' : 'text-white'}`} />
              <span className="text-xs text-white mt-1">{likeCount.toLocaleString()}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-transparent w-12 h-12 p-0 flex flex-col items-center"
            >
              <MessageSquare className="w-8 h-8 text-white" />
              <span className="text-xs text-white mt-1">{Math.floor(Math.random() * 1000) + 100}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-transparent w-12 h-12 p-0 flex flex-col items-center"
            >
              <BookmarkIcon className="w-8 h-8 text-white" />
              <span className="text-xs text-white mt-1">Save</span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-transparent w-12 h-12 p-0 flex flex-col items-center"
              onClick={copyToClipboard}
            >
              <Share2 className="w-8 h-8 text-white" />
              <span className="text-xs text-white mt-1">Share</span>
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-3 border-t border-gray-800 bg-[#1d1d1d]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-spin-slow">
                ♪
              </div>
              <div className="text-sm truncate max-w-[200px]">
                {topic} - @aceinfinity
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white"
              onClick={speakScript}
            >
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TikTokPreview;
