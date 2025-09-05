import React from 'react';
import { Heart } from 'lucide-react';

interface KofiButtonProps {
  theme: string;
  username?: string;
}

export function KofiButton({ theme, username = 'yourkofiusername' }: KofiButtonProps) {
  const getButtonClasses = () => {
    const base = "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200";
    
    switch (theme) {
      case 'light-developer':
        return `${base} bg-blue-600 hover:bg-blue-700 text-white`;
      case 'programmer-dark':
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

  return (
    <>
      {/* Ko-fi Button */}
      <a
        href={`https://ko-fi.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className={getButtonClasses()}
      >
        <Heart className="w-4 h-4" />
        Support on Ko-fi
      </a>

      {/* Ko-fi Widget Script */}
      <script
        src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"
        async
      />
      
      {/* Ko-fi Widget Initialization */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            kofiWidgetOverlay.draw('${username}', {
              'type': 'floating-chat',
              'floating-chat.donateButton.text': 'Support me',
              'floating-chat.donateButton.background-color': '#323842',
              'floating-chat.donateButton.text-color': '#fff'
            });
          `
        }}
      />
    </>
  );
}