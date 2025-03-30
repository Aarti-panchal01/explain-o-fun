import { FC, useState, useEffect } from 'react';
import { Explanation } from '../types/explanation';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Share2, Sparkles } from "lucide-react";
import TikTokPreview from './TikTokPreview';
import MemeGenerator from './MemeGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

interface ExplanationDisplayProps {
  explanation: Explanation | null;
}

const ExplanationDisplay: FC<ExplanationDisplayProps> = ({ explanation }) => {
  const { toast } = useToast();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  useEffect(() => {
    // Load available voices when component mounts
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
      }
    };

    // Initial load
    loadVoices();

    // Set up event listener for when voices change
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Cleanup
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  
  if (!explanation) return null;

  const getModeEmoji = () => {
    switch (explanation.mode) {
      case 'eli5': return '👶';
      case 'eli12': return '🧒';
      case 'eli20': return '🧠';
      case 'shower': return '🚿';
      default: return '🧠';
    }
  };

  const getPersonaEmoji = () => {
    switch (explanation.persona) {
      case 'professor': return '👩‍🏫';
      case 'geek': return '🤓';
      case 'genz': return '😆';
      case 'comedian': return '🎭';
      default: return '👩‍🏫';
    }
  };

  const speakText = () => {
    // Use the browser's text-to-speech API
    if ('speechSynthesis' in window) {
      // If already speaking, stop it
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(explanation.text);
      
      // Select voice based on persona
      if (voices.length > 0) {
        let voiceIndex = 0;
        
        // Try to find an appropriate voice for the persona
        switch (explanation.persona) {
          case 'professor':
            // Find a more formal sounding voice
            voiceIndex = voices.findIndex(v => 
              v.name.includes('Google') && (v.name.includes('Female') || v.name.includes('f'))
            );
            break;
          case 'genz':
            // Find a younger sounding voice
            voiceIndex = voices.findIndex(v => 
              v.name.includes('Google') && (v.name.includes('Female') || v.name.includes('f'))
            );
            break;
          case 'comedian':
            // Find a more expressive voice
            voiceIndex = voices.findIndex(v => 
              v.name.includes('Google') && (v.name.includes('Male') || v.name.includes('m'))
            );
            break;
          case 'geek':
            // Find a more technical sounding voice
            voiceIndex = voices.findIndex(v => 
              v.name.includes('Google') && (v.name.includes('Male') || v.name.includes('m'))
            );
            break;
        }
        
        // If we found a voice that matches our criteria, use it
        if (voiceIndex >= 0) {
          utterance.voice = voices[voiceIndex];
        } else {
          // Otherwise just pick one
          utterance.voice = voices[Math.floor(Math.random() * voices.length)];
        }
      }
      
      // Adjust speech rate based on persona
      switch (explanation.persona) {
        case 'professor':
          utterance.rate = 0.9; // Slower, more deliberate
          utterance.pitch = 1.0; // Normal pitch
          break;
        case 'genz':
          utterance.rate = 1.2; // Faster pace
          utterance.pitch = 1.1; // Slightly higher pitch
          break;
        case 'comedian':
          utterance.rate = 1.0; // Normal rate with more variation
          utterance.pitch = 1.2; // More animated
          break;
        case 'geek':
          utterance.rate = 1.1; // Slightly faster (excited about technical details)
          utterance.pitch = 0.9; // Slightly lower pitch
          break;
        default:
          utterance.rate = 1.0;
          utterance.pitch = 1.0;
      }
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      
      toast({
        title: "Text-to-Speech activated",
        description: "Listening to the explanation...",
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

  return (
    <div className="space-y-6">
      <Card className="bg-secondary/30 border border-muted backdrop-blur-md animate-fade-in">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{getModeEmoji()}</span>
            <span className="text-xl">{getPersonaEmoji()}</span>
            <h3 className="font-bold text-gradient text-xl">
              {explanation.topic}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant={isSpeaking ? "default" : "ghost"} 
              size="icon" 
              className={isSpeaking ? "bg-ace-purple text-white" : "text-muted-foreground"}
              onClick={speakText}
            >
              <Volume2 className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground"
              onClick={() => {
                navigator.clipboard.writeText(explanation.text);
                toast({
                  title: "Copied to clipboard",
                  description: "Explanation text has been copied.",
                  duration: 3000,
                });
              }}
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="prose prose-invert max-w-none">
            {explanation.text.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="tiktok" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="tiktok" className="flex items-center gap-2">
            <span>📱</span> TikTok Script
          </TabsTrigger>
          <TabsTrigger value="meme" className="flex items-center gap-2">
            <span>🎭</span> AI Meme
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tiktok" className="mt-4">
          {explanation.tikTokContent && (
            <TikTokPreview content={explanation.tikTokContent} topic={explanation.topic} />
          )}
        </TabsContent>
        <TabsContent value="meme" className="mt-4">
          {explanation.memeContent && (
            <MemeGenerator content={explanation.memeContent} topic={explanation.topic} />
          )}
        </TabsContent>
      </Tabs>

      <div className="flex justify-center">
        <Button 
          className="bg-gradient-to-r from-ace-pink to-ace-orange hover:opacity-90 gap-2"
          onClick={() => {
            toast({
              title: "Generating new content",
              description: "Hold tight! We're creating more amazing content for you.",
              duration: 3000,
            });
          }}
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate More Content</span>
        </Button>
      </div>
    </div>
  );
};

export default ExplanationDisplay;
