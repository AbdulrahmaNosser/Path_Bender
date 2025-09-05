import React, { useEffect, useRef } from 'react';
import { AdSenseManager } from '../utils/adsense';

interface AdSenseAdProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdSenseAd({ 
  adSlot, 
  adFormat = 'auto', 
  fullWidthResponsive = true,
  style = { display: 'block' },
  className = ''
}: AdSenseAdProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const adElement = adRef.current;
    if (!adElement) return;

    const checkAndPushAd = () => {
      // Check if element has non-zero width
      const rect = adElement.getBoundingClientRect();
      if (rect.width > 0) {
        AdSenseManager.pushAd(adSlot);
      }
    };

    // Use ResizeObserver to wait for non-zero width
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          checkAndPushAd();
          resizeObserver.disconnect();
          break;
        }
      }
    });

    // Start observing
    resizeObserver.observe(adElement);

    // Fallback: check immediately in case element already has width
    if (adElement.getBoundingClientRect().width > 0) {
      checkAndPushAd();
      resizeObserver.disconnect();
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [adSlot]);

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={{
        ...style,
        minWidth: '300px',
        minHeight: '250px'
      }}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your AdSense publisher ID
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive.toString()}
    />
  );
}