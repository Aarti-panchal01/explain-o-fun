
import { FC } from 'react';
import { Explanation } from '../types/explanation';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Share2, Sparkles } from "lucide-react";
import TikTokPreview from './TikTokPreview';
import MemeGenerator from './MemeGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ExplanationDisplayProps {
  explanation: Explanation | null;
}

const ExplanationDisplay: FC<ExplanationDisplayProps> = ({ explanation }) => {
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
            <Button variant="ghost" size="icon" className="text-muted-foreground">
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
