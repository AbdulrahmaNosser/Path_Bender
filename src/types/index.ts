export type PathFormat = 
  | 'windows'
  | 'linux'
  | 'unc'
  | 'python-raw'
  | 'python-forward'
  | 'javascript'
  | 'json'
  | 'url';

export type Theme = 
  | 'light-developer'
  | 'programmer-dark'
  | 'github-dark'
  | 'retro-computing'
  | 'hacker'
  | 'matrix'
  | 'cyberpunk'
  | 'solarized';

export interface ConversionResult {
  format: PathFormat;
  label: string;
  value: string;
  description: string;
}

export interface ThemeConfig {
  name: string;
  icon: string;
  description: string;
}