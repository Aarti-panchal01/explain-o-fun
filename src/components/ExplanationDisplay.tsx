
import { FC, useState } from 'react';
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
      
      // Adjust voice based on persona
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        // Try to match a voice to the persona
        let voiceIndex = 0;
        switch (explanation.persona) {
          case 'professor':
            // Find a more formal sounding voice
            voiceIndex = voices.findIndex(v => v.name.includes('Google') && v.name.includes('Female')) || 0;
            break;
          case 'genz':
            // Find a younger sounding voice
            voiceIndex = voices.findIndex(v => v.name.includes('Google') && v.name.includes('Female')) || 0;
            break;
          case 'comedian':
            // Find a more expressive voice
            voiceIndex = voices.findIndex(v => v.name.includes('Google') && v.name.includes('Male')) || 0;
            break;
          case 'geek':
            // Find a more technical sounding voice
            voiceIndex = voices.findIndex(v => v.name.includes('Google') && v.name.includes('Male')) || 0;
            break;
        }
        utterance.voice = voices[voiceIndex >= 0 ? voiceIndex : 0];
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
            <Button variant="ghost" size="icon" className="text-muted-foreground">
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
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate More Content</span>
        </Button>
      </div>
    </div>
  );
};

export default ExplanationDisplay;
