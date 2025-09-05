import React, { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import { ConversionResult } from '../types';
import { ClipboardManager } from '../utils/clipboard';

interface ConversionOutputProps {
  results: ConversionResult[];
  theme: string;
}

export function ConversionOutput({ results, theme }: ConversionOutputProps) {
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [copyingAll, setCopyingAll] = useState(false);

  const handleCopy = async (text: string, format: string) => {
    const success = await ClipboardManager.copyToClipboard(text);
    
    if (success) {
      setCopiedStates(prev => ({ ...prev, [format]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [format]: false }));
      }, 2000);
    }
  };

  const handleCopyAll = async () => {
    setCopyingAll(true);
    const success = await ClipboardManager.copyAllFormats(
      results.map(r => ({ label: r.label, value: r.value }))
    );
    
    if (success) {
      setTimeout(() => setCopyingAll(false), 2000);
    } else {
      setCopyingAll(false);
    }
  };

  if (results.length === 0) {
    return null;
  }

  const getCardClasses = () => {
    const base = "p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02]";
    
    switch (theme) {
      case 'matrix':
        return `${base} bg-green-950 border-green-500 hover:bg-green-900 hover:shadow-green-500/20 hover:shadow-lg`;
      case 'hacker':
        return `${base} bg-gray-900 border-green-500 hover:bg-gray-800 hover:shadow-green-500/20 hover:shadow-lg`;
      case 'programmer-dark':
        return `${base} bg-gray-800 border-blue-500 hover:bg-gray-700 hover:shadow-blue-500/20 hover:shadow-lg`;
      case 'light-developer':
        return `${base} bg-white border-gray-300 hover:bg-gray-50 hover:shadow-lg shadow-md`;
      case 'retro-computing':
        return `${base} bg-black border-yellow-600 hover:bg-gray-900 hover:shadow-yellow-600/20 hover:shadow-lg`;
      case 'cyberpunk':
        return `${base} bg-slate-900 border-cyan-500 hover:bg-slate-800 hover:shadow-cyan-500/20 hover:shadow-lg`;
      case 'github-dark':
        return `${base} bg-gray-900 border-gray-600 hover:bg-gray-800 hover:shadow-lg`;
      case 'solarized':
        return `${base} bg-blue-950 border-blue-600 hover:bg-blue-900 hover:shadow-blue-600/20 hover:shadow-lg`;
      default:
        return `${base} bg-gray-800 border-gray-600 hover:bg-gray-700`;
    }
  };

  const getButtonClasses = (copied: boolean) => {
    const base = "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200";
    
    if (copied) {
      return `${base} bg-green-600 text-white`;
    }
    
    switch (theme) {
      case 'matrix':
        return `${base} bg-green-700 hover:bg-green-600 text-green-100`;
      case 'hacker':
        return `${base} bg-green-700 hover:bg-green-600 text-green-100`;
      case 'programmer-dark':
        return `${base} bg-blue-700 hover:bg-blue-600 text-blue-100`;
      case 'light-developer':
        return `${base} bg-blue-600 hover:bg-blue-700 text-white`;
      case 'retro-computing':
        return `${base} bg-yellow-700 hover:bg-yellow-600 text-yellow-100`;
      case 'cyberpunk':
        return `${base} bg-cyan-700 hover:bg-cyan-600 text-cyan-100`;
      case 'github-dark':
        return `${base} bg-blue-700 hover:bg-blue-600 text-blue-100`;
      case 'solarized':
        return `${base} bg-blue-700 hover:bg-blue-600 text-blue-100`;
      default:
        return `${base} bg-gray-700 hover:bg-gray-600 text-gray-100`;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Download className="w-5 h-5" />
          Converted Paths
        </h2>
        <button
          onClick={handleCopyAll}
          disabled={copyingAll}
          className={getButtonClasses(copyingAll)}
        >
          {copyingAll ? (
            <>
              <Check className="w-4 h-4" />
              All Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy All
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((result) => {
          const isCopied = copiedStates[result.format];
          
          return (
            <div key={result.format} className={getCardClasses()}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base mb-1">{result.label}</h3>
                  <p className="text-xs opacity-75 leading-relaxed">{result.description}</p>
                </div>
                <button
                  onClick={() => handleCopy(result.value, result.format)}
                  className={getButtonClasses(isCopied)}
                  aria-label={`Copy ${result.label} format`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              
              <div className="relative">
                <code className={`
                  block p-3 rounded-md text-sm font-mono break-all
                  ${theme === 'light-developer' ? 'bg-gray-100' : 'bg-black bg-opacity-30'}
                  border border-current border-opacity-20
                `}>
                  {result.value}
                </code>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}