
import { FC } from 'react';
import { Sparkles } from 'lucide-react';

const Header: FC = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Sparkles className="w-8 h-8 text-ace-purple animate-pulse-slow" />
          <div className="absolute inset-0 bg-ace-purple blur-lg opacity-20 rounded-full"></div>
        </div>
        <h1 className="text-2xl font-bold text-gradient">
          ACE INFINITY
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-muted-foreground">Explain-O-Fun</span>
      </div>
    </header>
  );
};

export default Header;
