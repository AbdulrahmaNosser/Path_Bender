// Ko-fi integration utilities

export class KofiManager {
  private static readonly DEFAULT_USERNAME = 'yourkofiusername'; // Replace with your Ko-fi username
  
  /**
   * Initialize Ko-fi widget overlay
   */
  static initializeWidget(username: string = this.DEFAULT_USERNAME): void {
    if (typeof window === 'undefined') return;
    
    // Load Ko-fi widget script
    const script = document.createElement('script');
    script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
    script.async = true;
    script.onload = () => {
      this.drawWidget(username);
    };
    document.head.appendChild(script);
  }
  
  /**
   * Draw Ko-fi widget with custom configuration
   */
  private static drawWidget(username: string): void {
    if (typeof window === 'undefined' || !(window as any).kofiWidgetOverlay) return;
    
    (window as any).kofiWidgetOverlay.draw(username, {
      'type': 'floating-chat',
      'floating-chat.donateButton.text': 'Support me',
      'floating-chat.donateButton.background-color': '#323842',
      'floating-chat.donateButton.text-color': '#fff'
    });
  }
  
  /**
   * Create Ko-fi button URL
   */
  static createButtonUrl(username: string = this.DEFAULT_USERNAME): string {
    return `https://ko-fi.com/${username}`;
  }
  
  /**
   * Create Ko-fi donation URL with amount
   */
  static createDonationUrl(username: string = this.DEFAULT_USERNAME, amount?: number): string {
    const baseUrl = this.createButtonUrl(username);
    return amount ? `${baseUrl}?amount=${amount}` : baseUrl;
  }
  
  /**
   * Widget configuration options
   */
  static getWidgetConfig(customConfig?: Partial<KofiWidgetConfig>): KofiWidgetConfig {
    const defaultConfig: KofiWidgetConfig = {
      type: 'floating-chat',
      'floating-chat.donateButton.text': 'Support me',
      'floating-chat.donateButton.background-color': '#323842',
      'floating-chat.donateButton.text-color': '#fff'
    };
    
    return { ...defaultConfig, ...customConfig };
  }
}

export interface KofiWidgetConfig {
  type: 'floating-chat' | 'floating-button';
  'floating-chat.donateButton.text': string;
  'floating-chat.donateButton.background-color': string;
  'floating-chat.donateButton.text-color': string;
}

// Ko-fi color themes
export const KOFI_THEMES = {
  DEFAULT: {
    backgroundColor: '#323842',
    textColor: '#fff'
  },
  BLUE: {
    backgroundColor: '#0066cc',
    textColor: '#fff'
  },
  GREEN: {
    backgroundColor: '#00b894',
    textColor: '#fff'
  },
  RED: {
    backgroundColor: '#e74c3c',
    textColor: '#fff'
  },
  PURPLE: {
    backgroundColor: '#9b59b6',
    textColor: '#fff'
  }
};