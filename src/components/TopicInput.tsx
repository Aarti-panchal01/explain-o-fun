
import { FC } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mic, Sparkles } from "lucide-react";

interface TopicInputProps {
  topic: string;
  setTopic: (topic: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const TopicInput: FC<TopicInputProps> = ({ topic, setTopic, onSubmit, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative neon-glow">
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter anything you want explained..."
          className="pl-10 pr-24 py-6 bg-background text-foreground border border-muted rounded-lg"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Search className="w-5 h-5" />
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Voice input (coming soon)"
          >
            <Mic className="w-5 h-5" />
          </Button>
          <Button 
            type="submit" 
            size="sm" 
            className="bg-gradient-to-r from-ace-purple to-ace-blue hover:opacity-90"
            disabled={!topic.trim() || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin-slow" />
                <span>Thinking...</span>
              </div>
            ) : (
              <span>Explain</span>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TopicInput;
