import React from 'react';
import { Palette, Monitor, Terminal, Code, Sun, Zap, Github, Contrast } from 'lucide-react';
import { Theme, ThemeConfig } from '../types';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const themeConfigs: Record<Theme, ThemeConfig> = {
  'light-developer': { name: 'Light Developer', icon: 'sun', description: 'Clean light theme for coding' },
  'programmer-dark': { name: 'Dark Programmer', icon: 'code', description: 'VS Code inspired dark theme' },
  'github-dark': { name: 'GitHub Dark', icon: 'github', description: 'GitHub dark theme colors' },
  'retro-computing': { name: 'Retro Computing', icon: 'monitor', description: 'Amber on black DOS aesthetic' },
  'hacker': { name: 'Hacker Terminal', icon: 'terminal', description: 'Classic hacker aesthetic' },
  'matrix': { name: 'The Matrix', icon: 'terminal', description: 'Green on black with digital rain' },
  'cyberpunk': { name: 'Cyberpunk', icon: 'zap', description: 'Neon colors and futuristic style' },
  'solarized': { name: 'Solarized', icon: 'contrast', description: 'Eye-friendly color scheme' }
};

const iconMap = {
  terminal: Terminal,
  code: Code,
  sun: Sun,
  monitor: Monitor,
  zap: Zap,
  github: Github,
  contrast: Contrast,
  palette: Palette
};

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="relative">
      <select
        value={currentTheme}
        onChange={(e) => onThemeChange(e.target.value as Theme)}
        className="appearance-none bg-transparent border border-current rounded-lg px-4 py-2 pr-10 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-current"
      >
        {Object.entries(themeConfigs).map(([key, config]) => (
          <option key={key} value={key} className="bg-black text-white">
            {config.name}
          </option>
        ))}
      </select>
      <Palette className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
    </div>
  );
}