import React, { useState, useEffect } from 'react';
import { FolderOpen, FileText, GitBranch, ArrowRight } from 'lucide-react';
import { PathBender } from '../utils/PathBender';

interface PathInputProps {
  value: string;
  onChange: (value: string) => void;
  theme: string;
  onRelativePathResult?: (result: string) => void;
}

export function PathInput({ value, onChange, theme, onRelativePathResult }: PathInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showRelativeCalculator, setShowRelativeCalculator] = useState(false);
  const [fromPath, setFromPath] = useState('');
  const [toPath, setToPath] = useState('');
  const [relativePath, setRelativePath] = useState('');

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    onChange(pastedText);
  };

  const calculateRelative = () => {
    if (fromPath.trim() && toPath.trim()) {
      const result = PathBender.calculateRelativePath(fromPath, toPath);
      setRelativePath(result);
      if (onRelativePathResult) {
        onRelativePathResult(result);
      }
    }
  };

  const getInputClasses = () => {
    const base = "w-full p-3 rounded-lg border bg-transparent font-mono focus:outline-none focus:ring-2 focus:ring-current transition-all duration-200";
    
    switch (theme) {
      case 'light-developer':
        return `${base} border-gray-300 focus:border-blue-500`;
      default:
        return `${base} border-current border-opacity-30 focus:border-opacity-60`;
    }
  };

  const getButtonClasses = () => {
    const base = "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200";
    
    switch (theme) {
      case 'light-developer':
        return `${base} bg-blue-600 hover:bg-blue-700 text-white`;
      case 'dark-programmer':
        return `${base} bg-blue-700 hover:bg-blue-600 text-blue-100`;
      case 'github-dark':
        return `${base} bg-blue-700 hover:bg-blue-600 text-blue-100`;
      case 'retro-computing':
        return `${base} bg-yellow-700 hover:bg-yellow-600 text-yellow-100`;
      case 'hacker':
        return `${base} bg-green-700 hover:bg-green-600 text-green-100`;
      case 'matrix':
        return `${base} bg-green-700 hover:bg-green-600 text-green-100`;
      case 'cyberpunk':
        return `${base} bg-cyan-700 hover:bg-cyan-600 text-cyan-100`;
      case 'solarized':
        return `${base} bg-blue-700 hover:bg-blue-600 text-blue-100`;
      default:
        return `${base} bg-gray-700 hover:bg-gray-600 text-gray-100`;
    }
  };

  const getCardClasses = () => {
    const base = "p-4 rounded-lg border transition-all duration-300";
    
    switch (theme) {
      case 'matrix':
        return `${base} bg-green-950 border-green-500`;
      case 'hacker':
        return `${base} bg-gray-900 border-green-500`;
      case 'dark-programmer':
        return `${base} bg-gray-800 border-blue-500`;
      case 'light-developer':
        return `${base} bg-white border-gray-300 shadow-md`;
      case 'retro-computing':
        return `${base} bg-black border-yellow-600`;
      case 'cyberpunk':
        return `${base} bg-slate-900 border-cyan-500`;
      case 'github-dark':
        return `${base} bg-gray-900 border-gray-600`;
      case 'solarized':
        return `${base} bg-blue-950 border-blue-600`;
      default:
        return `${base} bg-gray-800 border-gray-600`;
    }
  };

  const examplePaths = [
    'C:\\Users\\John\\Documents\\project.txt',
    '/home/john/documents/project.txt',
    'r"C:\\Program Files\\MyApp"',
    'file:///C:/Users/John/Desktop'
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="mb-4">
        <label className="flex items-center gap-2 text-lg font-semibold mb-2">
          <FileText className="w-5 h-5" />
          Enter Path to Convert
        </label>
        <p className="text-sm opacity-75 mb-4">
          Paste any file or directory path. Automatic format detection included.
        </p>
      </div>
      
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onPaste={handlePaste}
          placeholder="Paste your path here... (e.g., C:\Users\John\Documents)"
          className={`${getInputClasses()} h-24 text-lg resize-none ${isFocused ? 'ring-2 ring-current' : ''}`}
        />
        <FolderOpen className="absolute top-4 right-4 w-5 h-5 opacity-50" />
      </div>
      
      {!value && (
        <div className="mt-4">
          <p className="text-sm opacity-75 mb-2">Try these examples:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {examplePaths.map((example, index) => (
              <button
                key={index}
                onClick={() => onChange(example)}
                className="text-left p-2 rounded border border-current border-opacity-30 hover:border-opacity-60 transition-all duration-200 text-sm font-mono"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Relative Path Calculator */}
      <div className={getCardClasses()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            Relative Path Calculator
          </h3>
          <button
            onClick={() => setShowRelativeCalculator(!showRelativeCalculator)}
            className="text-sm opacity-75 hover:opacity-100 transition-opacity"
          >
            {showRelativeCalculator ? 'Hide' : 'Show'}
          </button>
        </div>
        
        {showRelativeCalculator && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">From Path:</label>
              <input
                type="text"
                value={fromPath}
                onChange={(e) => setFromPath(e.target.value)}
                placeholder="C:\Users\John\Documents"
                className={getInputClasses()}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">To Path:</label>
              <input
                type="text"
                value={toPath}
                onChange={(e) => setToPath(e.target.value)}
                placeholder="C:\Users\John\Pictures\photo.jpg"
                className={getInputClasses()}
              />
            </div>
            
            <button
              onClick={calculateRelative}
              disabled={!fromPath.trim() || !toPath.trim()}
              className={`${getButtonClasses()} ${(!fromPath.trim() || !toPath.trim()) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ArrowRight className="w-4 h-4" />
              Calculate Relative Path
            </button>
            
            {relativePath && (
              <div className="mt-4 p-3 rounded-lg border border-current border-opacity-20">
                <p className="text-sm font-medium mb-2">Relative Path:</p>
                <code className="block p-2 rounded bg-black bg-opacity-30 font-mono text-sm">
                  {relativePath}
                </code>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}