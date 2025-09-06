import React, { useState, useEffect } from 'react';
import { RotateCcw, Mail, Heart } from 'lucide-react';
import { Header } from './components/Header';
import { PathInput } from './components/PathInput';
import { ConversionOutput } from './components/ConversionOutput';
import { MatrixRain } from './components/MatrixRain';
// import { ContactPage } from './components/ContactPage';
// import { KofiButton } from './components/KofiButton';
// import { AdSenseAd } from './components/AdSenseAd';
import { PathBender } from './utils/PathBender';
import { Theme } from './types';
import './styles/themes.css';

function App() {
  const [inputPath, setInputPath] = useState('');
  const [theme, setTheme] = useState<Theme>(() => {
    // Load theme from localStorage on initialization
    const savedTheme = localStorage.getItem('pathBender-theme') as Theme;
    return savedTheme || 'programmer-dark';
  });
  const [conversionResults, setConversionResults] = useState(PathBender.convertPath(''));
  // const [currentPage, setCurrentPage] = useState<'home' | 'contact'>('home');

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('pathBender-theme', newTheme);
  };

  const getContainerClasses = () => {
    const base = "min-h-screen transition-all duration-500 p-4 md:p-8";
    return base;
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = '';
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (inputPath.trim()) {
      setConversionResults(PathBender.convertPath(inputPath));
    } else {
      setConversionResults([]);
    }
  }, [inputPath]);

  const getBackgroundEffects = () => {
    switch (theme) {
      case 'matrix':
        return <MatrixRain />;
      case 'cyberpunk':
        return (
          <div className="fixed inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 animate-pulse" />
          </div>
        );
      default:
        return null;
    }
  };

  // const getFooterClasses = () => {
  //   const base = "mt-16 pt-8 border-t border-current border-opacity-20 text-center";
  //   return base;
  // };

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

  // if (currentPage === 'contact') {
  //   return (
  //     <div className={getContainerClasses()}>
  //       {getBackgroundEffects()}
  //       <div className="relative z-10 flex flex-col items-center">
  //         <Header theme={theme} onThemeChange={handleThemeChange} />
  //         <ContactPage theme={theme} onBack={() => setCurrentPage('home')} />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className={getContainerClasses()}>
      {getBackgroundEffects()}
      
      <div className="relative z-10 flex flex-col items-center">
        <Header theme={theme} onThemeChange={handleThemeChange} />
        
        <div className="w-full space-y-12">
          <PathInput 
            value={inputPath}
            onChange={setInputPath}
            theme={theme}
            onRelativePathResult={(result) => {
              // You can handle the relative path result here if needed
              console.log('Relative path calculated:', result);
            }}
          />
          
          {conversionResults.length > 0 && (
            <ConversionOutput 
              results={conversionResults}
              theme={theme}
            />
          )}
          
          {/* AdSense Ad */}
          {/* <div className="flex justify-center">
            <AdSenseAd 
              adSlot="1234567890"
              adFormat="auto"
              fullWidthResponsive={true}
            />
          </div> */}
        </div>
        
        {!inputPath && (
          <div className="mt-16 text-center opacity-75">
            <div className="inline-flex items-center gap-2 text-sm">
              <RotateCcw className="w-4 h-4" />
              Start by entering any file or directory path above
            </div>
          </div>
        )}
        
        {/* <footer className={getFooterClasses()}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage('contact')}
              className={getButtonClasses()}
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </button>
            <KofiButton theme={theme} />
          </div>
          <p className="mt-4 text-sm opacity-60">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </footer> */}
      </div>
    </div>
  );
}

export default App;