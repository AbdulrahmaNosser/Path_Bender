export class ClipboardManager {
  static async copyToClipboard(text: string): Promise<boolean> {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      
      // Fallback for older browsers
      return this.fallbackCopy(text);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return this.fallbackCopy(text);
    }
  }

  private static fallbackCopy(text: string): boolean {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      return result;
    } catch (error) {
      console.error('Fallback copy failed:', error);
      return false;
    }
  }

  static async copyAllFormats(results: Array<{ label: string; value: string }>): Promise<boolean> {
    const formattedText = results
      .map(result => `${result.label}: ${result.value}`)
      .join('\n');
    
    return this.copyToClipboard(formattedText);
  }
}