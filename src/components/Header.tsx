
import { FC } from 'react';
import { Sparkles, Zap, Lightbulb, Brain } from 'lucide-react';

const Header: FC = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute -z-10 top-0 left-0 w-full h-full">
        <div className="absolute top-5 left-10 w-20 h-20 bg-ace-purple/10 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute bottom-5 right-10 w-32 h-32 bg-ace-pink/10 rounded-full blur-xl animate-pulse-slow"></div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative">
          <Sparkles className="w-8 h-8 text-ace-purple animate-pulse-slow" />
          <div className="absolute inset-0 bg-ace-purple blur-lg opacity-20 rounded-full"></div>
        </div>
        <h1 className="text-2xl font-bold text-gradient">
          ACE INFINITY
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
            <Zap className="w-4 h-4 text-ace-orange" />
            <span className="text-sm font-medium">TikTok Mode</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
            <Lightbulb className="w-4 h-4 text-ace-blue" />
            <span className="text-sm font-medium">Meme Labs</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
            <Brain className="w-4 h-4 text-ace-green" />
            <span className="text-sm font-medium">Explain-O-Fun</span>
          </div>
        </div>
        
        <div className="glass-effect rounded-full px-4 py-1 text-xs font-semibold text-ace-purple/90 border border-ace-purple/20 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>BETA</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
