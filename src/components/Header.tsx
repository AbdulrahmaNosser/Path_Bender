import React from 'react';
import { RotateCcw, Zap } from 'lucide-react';
import { ThemeSelector } from './ThemeSelector';
import { Theme } from '../types';

interface HeaderProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function Header({ theme, onThemeChange }: HeaderProps) {
  const getTitleClasses = () => {
    const base = "text-4xl md:text-6xl font-bold tracking-tight";
    
    switch (theme) {
      case 'matrix':
        return `${base} glow`;
      case 'cyberpunk':
        return `${base} neon`;
      default:
        return base;
    }
  };

  return (
    <header className="w-full max-w-6xl mx-auto text-center mb-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Zap className="w-8 h-8" />
          <span className="text-2xl font-bold">PathConverter</span>
        </div>
        <ThemeSelector currentTheme={theme} onThemeChange={onThemeChange} />
      </div>
      
      <h1 className={getTitleClasses()}>
        Universal Path Converter
      </h1>
      
      <p className="text-lg md:text-xl opacity-90 mt-4 max-w-3xl mx-auto leading-relaxed">
        Convert file and directory paths between operating systems and programming languages with 
        intelligent escape character handling and one-click clipboard integration.
      </p>
      
      <div className="flex flex-wrap justify-center gap-2 mt-6 text-sm opacity-75">
        <span className="px-3 py-1 rounded-full border border-current border-opacity-30">
          Windows ⟷ Linux
        </span>
        <span className="px-3 py-1 rounded-full border border-current border-opacity-30">
          Python Strings
        </span>
        <span className="px-3 py-1 rounded-full border border-current border-opacity-30">
          JavaScript/JSON
        </span>
        <span className="px-3 py-1 rounded-full border border-current border-opacity-30">
          File URLs
        </span>
      </div>
    </header>
  );
}