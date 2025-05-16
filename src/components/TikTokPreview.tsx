import { FC, useState, useRef, useEffect } from 'react';
import { TikTokContent } from '../types/explanation';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Download, Share2, Play, RefreshCw, Heart, MessageSquare, BookmarkIcon, Music, Sparkles, Flame, Check } from "lucide-react";
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
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  
  const viralHashtags = [
    "#learnontiktok", 
    "#explainer", 
    "#viral", 
    "#trending", 
    "#fyp", 
    "#educationtok", 
    "#mindblown", 
    "#facts"
  ];
  
  // Reset copied state after 2 seconds
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

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
        // Try to find a younger-sounding voice
        const voiceIndex = voices.findIndex(v => 
          v.name.includes('Female') || v.name.includes('Girl') || v.name.includes('f')
        ) || Math.floor(Math.random() * voices.length);
        utterance.voice = voices[voiceIndex >= 0 ? voiceIndex : 0];
        utterance.rate = 1.1; // Slightly faster for TikTok style
        utterance.pitch = 1.2; // Higher pitch for younger sound
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
    const fullText = `${content.script}\n\n${viralHashtags.join(' ')}`;
    navigator.clipboard.writeText(fullText);
    setIsCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "TikTok script with hashtags has been copied and ready to share!",
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

  const handleGenerateMore = () => {
    setIsGenerating(true);
    
    // Simulate generating new content
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "New viral content generated!",
        description: "Your TikTok script has been updated with more viral potential!",
        duration: 3000,
      });
    }, 1500);
  };

  const renderScript = () => {
    // Format the script with better visual styling, bold keywords, etc.
    const formatted = content.script
      .replace(/\*([^*]+)\*/g, '<span class="font-bold">$1</span>')
      .split(' ')
      .map(word => {
        if (word.startsWith('#')) {
          return `<span class="text-blue-400">${word}</span>`;
        }
        // Highlight key phrases
        if (['literally', 'actually', 'basically', 'seriously', 'honestly'].includes(word.toLowerCase())) {
          return `<span class="font-bold">${word}</span>`;
        }
        return word;
      })
      .join(' ');
    
    return (
      <p 
        className="text-white my-1 leading-relaxed text-lg" 
        dangerouslySetInnerHTML={{ __html: formatted }}
      />
    );
  };
  
  return (
    <Card className="bg-[#121212] border-none overflow-hidden max-w-md mx-auto text-white shadow-xl">
      <div className="bg-[#1d1d1d] py-3 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🔥</span>
          <h3 className="font-bold text-white">TikTok</h3>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white"
            onClick={speakScript}
          >
            <Play className={`w-4 h-4 ${isPlaying ? 'fill-red-500' : 'fill-white'}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={handleGenerateMore}
            disabled={isGenerating}
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-0">
        <div className="relative bg-[#121212] min-h-[450px] flex flex-col">
          <div className="flex items-center gap-3 p-4 border-b border-gray-800">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl">
              {getEmojiForStyle()}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-white font-bold">@explainofun</span>
                <span className="text-xs text-blue-400">#{topic.length > 12 ? topic.substring(0, 12).replace(/\s+/g, '') : topic.replace(/\s+/g, '')}</span>
              </div>
              <span className="text-xs text-gray-400">The most viral explanations</span>
            </div>
            <Button
              size="sm"
              variant={isFollowing ? "default" : "outline"}
              className={`ml-auto text-sm h-8 rounded-full px-4 ${isFollowing ? 'bg-gray-700 hover:bg-gray-600' : 'border border-[#FE2C55] text-[#FE2C55]'}`}
              onClick={() => {
                setIsFollowing(!isFollowing);
                toast({
                  title: isFollowing ? "Unfollowed" : "Following @explainofun",
                  description: isFollowing ? "You unfollowed this creator" : "You're now following this creator!",
                  duration: 1500,
                });
              }}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
          </div>
          
          <div ref={videoRef} className="p-4 flex-grow">
            <div className="mb-3">
              {renderScript()}
            </div>
            
            <div className="flex flex-wrap gap-1 mt-3">
              {viralHashtags.map((hashtag, index) => (
                <span key={index} className="text-blue-400 text-sm font-medium">{hashtag}</span>
              ))}
            </div>
            
            <div className="mt-4 flex items-center gap-2 text-gray-400 text-xs">
              <Music className="w-3 h-3" />
              <span className="truncate flex-1">original sound - Explain-O-Fun</span>
            </div>

            <div className="mt-4 bg-black/30 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-bold">Viral potential: 87%</span>
              </div>
              <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-gradient-to-r from-orange-500 to-red-500" style={{ width: '87%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="absolute right-3 bottom-24 flex flex-col gap-5">
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
              <div className="relative">
                <Share2 className="w-8 h-8 text-white" />
                {isCopied && (
                  <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <span className="text-xs text-white mt-1">Share</span>
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-3 border-t border-gray-800 bg-[#1d1d1d]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-spin-slow">
                ♪
              </div>
              <div className="text-sm truncate max-w-[200px]">
                {topic} - @explainofun
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white flex gap-1 items-center"
              onClick={speakScript}
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TikTokPreview;
