
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ModeSelector from '@/components/ModeSelector';
import TopicInput from '@/components/TopicInput';
import ExplanationDisplay from '@/components/ExplanationDisplay';
import { Explanation, ExplanationMode, PersonaMode } from '@/types/explanation';
import { generateExplanation } from '@/services/explanationService';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Brain, Flame, TrendingUp, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [topic, setTopic] = useState('');
  const [explanationMode, setExplanationMode] = useState<ExplanationMode>('eli5');
  const [personaMode, setPersonaMode] = useState<PersonaMode>('professor');
  const [isLoading, setIsLoading] = useState(false);
  const [explanation, setExplanation] = useState<Explanation | null>(null);
  const { toast } = useToast();
  const [trendingTopics, setTrendingTopics] = useState<Array<{topic: string, heat: number}>>([]);

  // Mock trending topics that change periodically
  useEffect(() => {
    const mockTrendingTopics = [
      { topic: 'Quantum Computing', heat: 98 },
      { topic: 'Black Holes', heat: 87 },
      { topic: 'Artificial Intelligence', heat: 95 },
      { topic: 'Blockchain', heat: 82 },
      { topic: 'Dark Matter', heat: 78 },
      { topic: 'String Theory', heat: 76 },
      { topic: 'Climate Change', heat: 92 },
      { topic: 'Genetic Engineering', heat: 89 },
      { topic: 'Renewable Energy', heat: 85 },
      { topic: 'Virtual Reality', heat: 81 },
    ];
    
    // Shuffle and take 5 random topics
    const shuffled = [...mockTrendingTopics].sort(() => 0.5 - Math.random());
    setTrendingTopics(shuffled.slice(0, 5));
    
    // Refresh trending topics every 60 seconds
    const interval = setInterval(() => {
      const newShuffled = [...mockTrendingTopics].sort(() => 0.5 - Math.random());
      setTrendingTopics(newShuffled.slice(0, 5));
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const handleExplain = async () => {
    if (!topic.trim()) return;
    
    try {
      setIsLoading(true);
      const result = await generateExplanation(topic, explanationMode, personaMode);
      setExplanation(result);
      
      toast({
        title: "Explanation generated!",
        description: `Your explanation of "${topic}" is ready to view.`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem generating your explanation.",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTrendingTopicClick = async (trendingTopic: string) => {
    setTopic(trendingTopic);
    
    try {
      setIsLoading(true);
      const result = await generateExplanation(trendingTopic, explanationMode, personaMode);
      setExplanation(result);
      
      toast({
        title: "Trending topic explained!",
        description: `Your explanation of "${trendingTopic}" is ready to view.`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem generating your explanation.",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="text-gradient">Explain-O-Fun</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Supercharged AI explanations that break down any concept into fun, 
            easy-to-understand formats. Choose your style below!
          </p>
        </div>
        
        {/* Trending Topics Section */}
        <div className="glass-effect rounded-xl p-6 neon-glow">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-ace-purple" />
            <h2 className="text-xl font-semibold">Trending Topics</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {trendingTopics.map((trendingTopic, index) => (
              <Card key={index} className="bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer border border-muted" onClick={() => handleTrendingTopicClick(trendingTopic.topic)}>
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="w-full flex justify-between items-center mb-2">
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="text-xs text-orange-500 font-medium">{trendingTopic.heat}%</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <h3 className="text-center font-medium text-sm">
                    {trendingTopic.topic}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="glass-effect rounded-xl p-6 neon-glow">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-ace-purple" />
              <h2 className="text-xl font-semibold">Let me explain...</h2>
            </div>
            <TopicInput 
              topic={topic} 
              setTopic={setTopic} 
              onSubmit={handleExplain} 
              isLoading={isLoading} 
            />
          </div>
          
          <div className="glass-effect rounded-xl p-6 neon-glow">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-ace-blue" />
              <h2 className="text-xl font-semibold">Customize your explanation</h2>
            </div>
            <ModeSelector 
              selectedExplanationMode={explanationMode}
              setExplanationMode={setExplanationMode}
              selectedPersonaMode={personaMode}
              setPersonaMode={setPersonaMode}
            />
          </div>
          
          {explanation && (
            <div className="neon-glow">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="w-5 h-5 text-ace-orange" />
                <h2 className="text-xl font-semibold">Your explanation</h2>
              </div>
              <ExplanationDisplay explanation={explanation} />
            </div>
          )}
        </div>
      </main>
      
      <footer className="py-6 border-t border-muted">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} ACE INFINITY - All Rights Reserved
          </p>
          <p className="text-muted-foreground text-sm">
            Powered by Explain-O-Fun
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
