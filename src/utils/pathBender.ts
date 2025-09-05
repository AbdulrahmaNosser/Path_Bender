import { PathFormat, ConversionResult } from '../types';

export class PathBender {
  static detectFormat(path: string): PathFormat | null {
    // Windows path detection
    if (/^[A-Za-z]:\\/.test(path)) {
      return 'windows';
    }
    
    // Linux/Unix path detection
    if (path.startsWith('/')) {
      return 'linux';
    }
    
    // Python raw string detection
    if (/^r["'].*["']$/.test(path)) {
      return 'python-raw';
    }
    
    // URL format detection
    if (/^file:\/\/\//.test(path)) {
      return 'url';
    }
    
    // UNC path detection
    if (/^\\\\/.test(path)) {
      return 'unc';
    }
    
    return null;
  }

  static normalizePath(path: string): string {
    // Remove quotes and raw string markers
    let normalized = path.trim();
    
    // Remove Python raw string markers
    if (/^r["'](.*)["']$/.test(normalized)) {
      normalized = normalized.slice(2, -1);
    }
    
    // Remove regular quotes
    if ((normalized.startsWith('"') && normalized.endsWith('"')) ||
        (normalized.startsWith("'") && normalized.endsWith("'"))) {
      normalized = normalized.slice(1, -1);
    }
    
    // Remove file:// protocol
    if (normalized.startsWith('file:///')) {
      normalized = normalized.slice(8);
    }
    
    // Handle UNC paths
    if (normalized.startsWith('\\\\')) {
      return normalized;
    }
    
    return normalized;
  }

  static convertPath(inputPath: string): ConversionResult[] {
    const normalized = this.normalizePath(inputPath);
    const results: ConversionResult[] = [];

    // Windows format
    const windowsPath = this.toWindowsPath(normalized);
    results.push({
      format: 'windows',
      label: 'Windows PowerShell',
      value: windowsPath,
      description: 'Windows backslash format for PowerShell and Command Prompt'
    });

    // Linux format
    const linuxPath = this.toLinuxPath(normalized);
    results.push({
      format: 'linux',
      label: 'Bash/Linux',
      value: linuxPath,
      description: 'Unix-style forward slash format'
    });

    // Python raw string
    const pythonRaw = `r"${windowsPath}"`;
    results.push({
      format: 'python-raw',
      label: 'Python Raw String',
      value: pythonRaw,
      description: 'Python raw string (no escaping needed)'
    });

    // Python forward slash
    const pythonForward = `"${linuxPath}"`;
    results.push({
      format: 'python-forward',
      label: 'Python Forward Slash',
      value: pythonForward,
      description: 'Python string with forward slashes'
    });

    // JavaScript
    const jsPath = `"${windowsPath.replace(/\\/g, '\\\\')}"`;
    results.push({
      format: 'javascript',
      label: 'JavaScript/TypeScript',
      value: jsPath,
      description: 'JavaScript string with escaped backslashes'
    });

    // JSON
    const jsonPath = `"${windowsPath.replace(/\\/g, '\\\\\\\\')}"`;
    results.push({
      format: 'json',
      label: 'JSON',
      value: jsonPath,
      description: 'JSON string with double-escaped backslashes'
    });

    // UNC format
    const uncPath = this.toUncPath(normalized);
    results.push({
      format: 'unc',
      label: 'UNC Network Path',
      value: uncPath,
      description: 'Universal Naming Convention for network resources'
    });

    // URL format
    const urlPath = this.toUrlPath(normalized);
    results.push({
      format: 'url',
      label: 'File URL / URI Path',
      value: urlPath,
      description: 'file:// protocol URL/URI format'
    });

    return results;
  }

  private static toWindowsPath(path: string): string {
    // Convert forward slashes to backslashes
    let result = path.replace(/\//g, '\\');
    
    // Ensure Windows drive letter format
    if (/^\/[a-zA-Z]\//.test(path)) {
      result = result.substring(1).replace('\\', ':\\');
    }
    
    return result;
  }

  private static toLinuxPath(path: string): string {
    // Convert backslashes to forward slashes
    let result = path.replace(/\\/g, '/');
    
    // Convert Windows drive letter to Linux format
    if (/^[A-Za-z]:/.test(result)) {
      const drive = result.charAt(0).toLowerCase();
      result = `/mnt/${drive}${result.substring(2)}`;
    }
    
    return result;
  }

  private static toUrlPath(path: string): string {
    const windowsPath = this.toWindowsPath(path);
    
    // Convert to URL format
    let urlPath = windowsPath.replace(/\\/g, '/');
    
    // Ensure it starts with file://
    if (!urlPath.startsWith('/')) {
      urlPath = '/' + urlPath;
    }
    
    return `file://${urlPath}`;
  }

  private static toUncPath(path: string): string {
    // Convert to UNC format
    let uncPath = path.replace(/\//g, '\\');
    
    // If it's already a UNC path, return as is
    if (uncPath.startsWith('\\\\')) {
      return uncPath;
    }
    
    // Convert Windows drive letter to UNC format
    if (/^[A-Za-z]:/.test(uncPath)) {
      const drive = uncPath.charAt(0).toUpperCase();
      return `\\\\localhost\\${drive}$${uncPath.substring(2)}`;
    }
    
    // Convert Linux path to UNC format
    if (uncPath.startsWith('\\')) {
      return `\\\\localhost\\root${uncPath}`;
    }
    
    return `\\\\localhost\\${uncPath}`;
  }

  static escapeForShell(path: string, shell: 'bash' | 'powershell' | 'cmd'): string {
    switch (shell) {
      case 'bash':
        // Escape spaces and special characters for bash
        return path.replace(/[ ()&|;<>$`"'\\]/g, '\\$&');
      
      case 'powershell':
        // PowerShell escaping
        if (/[ ()&|;<>$`"']/.test(path)) {
          return `"${path.replace(/"/g, '""')}"`;
        }
        return path;
      
      case 'cmd':
        // Command Prompt escaping
        if (/[ ()&|;<>^"]/.test(path)) {
          return `"${path.replace(/"/g, '""')}"`;
        }
        return path;
      
      default:
        return path;
    }
  }

  static calculateRelativePath(fromPath: string, toPath: string): string {
    // Normalize both paths
    const from = this.normalizePath(fromPath).replace(/\\/g, '/');
    const to = this.normalizePath(toPath).replace(/\\/g, '/');
    
    // Split paths into segments
    const fromSegments = from.split('/').filter(segment => segment !== '');
    const toSegments = to.split('/').filter(segment => segment !== '');
    
    // Find common prefix
    let commonLength = 0;
    const minLength = Math.min(fromSegments.length, toSegments.length);
    
    for (let i = 0; i < minLength; i++) {
      if (fromSegments[i] === toSegments[i]) {
        commonLength++;
      } else {
        break;
      }
    }
    
    // Calculate relative path
    const upLevels = fromSegments.length - commonLength - 1; // -1 because we don't go up from the file itself
    const downPath = toSegments.slice(commonLength);
    
    let relativePath = '';
    
    // Add "../" for each level up
    for (let i = 0; i < upLevels; i++) {
      relativePath += '../';
    }
    
    // Add the remaining path
    relativePath += downPath.join('/');
    
    // If the result is empty, it means the paths are the same
    if (!relativePath) {
      return './';
    }
    
    // If it doesn't start with ../, add ./
    if (!relativePath.startsWith('../') && !relativePath.startsWith('./')) {
      relativePath = './' + relativePath;
    }
    
    return relativePath;
  }
}