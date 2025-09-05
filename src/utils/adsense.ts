// Google AdSense utility functions

export class AdSenseManager {
  private static readonly PUBLISHER_ID = 'ca-pub-XXXXXXXXXXXXXXXX'; // Replace with your actual publisher ID
  private static pushedSlots = new Set<string>();
  
  /**
   * Initialize AdSense script if not already loaded
   */
  static initializeAdSense(): void {
    if (typeof window === 'undefined') return;
    
    // Check if AdSense script is already loaded
    const existingScript = document.querySelector('script[src*="adsbygoogle.js"]');
    if (existingScript) return;
    
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${this.PUBLISHER_ID}`;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }
  
  /**
   * Push ad to AdSense queue (prevents duplicates)
   */
  static pushAd(adSlot: string): void {
    if (typeof window === 'undefined') return;
    
    // Check if this slot has already been pushed
    if (this.pushedSlots.has(adSlot)) {
      return;
    }
    
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      this.pushedSlots.add(adSlot);
    } catch (error) {
      console.error('AdSense push error:', error);
    }
  }
  
  /**
   * Reset pushed slots (useful for development)
   */
  static resetPushedSlots(): void {
    this.pushedSlots.clear();
  }
  
  /**
   * Create responsive ad configuration
   */
  static createResponsiveAdConfig(adSlot: string) {
    return {
      'data-ad-client': this.PUBLISHER_ID,
      'data-ad-slot': adSlot,
      'data-ad-format': 'auto',
      'data-full-width-responsive': 'true'
    };
  }
  
  /**
   * Create banner ad configuration
   */
  static createBannerAdConfig(adSlot: string, width: number, height: number) {
    return {
      'data-ad-client': this.PUBLISHER_ID,
      'data-ad-slot': adSlot,
      'data-ad-format': 'rectangle',
      style: {
        display: 'inline-block',
        width: `${width}px`,
        height: `${height}px`
      }
    };
  }
}

// Common ad slot configurations
export const AD_SLOTS = {
  HEADER_BANNER: '1234567890',
  SIDEBAR: '0987654321',
  FOOTER: '1122334455',
  IN_CONTENT: '5544332211'
};

// Responsive breakpoints for ads
export const AD_BREAKPOINTS = {
  MOBILE: 320,
  TABLET: 768,
  DESKTOP: 1024
};