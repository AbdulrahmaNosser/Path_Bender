import React, { useState } from 'react';
import { ArrowLeft, Mail, Github, Linkedin, Twitter, Send, User, MessageSquare } from 'lucide-react';

interface ContactPageProps {
  theme: string;
  onBack: () => void;
}

export function ContactPage({ theme, onBack }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const getCardClasses = () => {
    const base = "p-6 rounded-lg border transition-all duration-300";
    
    switch (theme) {
      case 'light-developer':
        return `${base} bg-white border-gray-300 shadow-lg`;
      case 'programmer-dark':
        return `${base} bg-gray-800 border-blue-500`;
      case 'github-dark':
        return `${base} bg-gray-900 border-gray-600`;
      case 'retro-computing':
        return `${base} bg-black border-yellow-600`;
      case 'hacker':
        return `${base} bg-gray-900 border-green-500`;
      case 'matrix':
        return `${base} bg-green-950 border-green-500`;
      case 'cyberpunk':
        return `${base} bg-slate-900 border-cyan-500`;
      case 'solarized':
        return `${base} bg-blue-950 border-blue-600`;
      default:
        return `${base} bg-gray-800 border-gray-600`;
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

  const getButtonClasses = (variant: 'primary' | 'secondary' = 'primary') => {
    const base = "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200";
    
    if (variant === 'secondary') {
      return `${base} border border-current border-opacity-30 hover:border-opacity-60`;
    }
    
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
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <button
          onClick={onBack}
          className={getButtonClasses('secondary')}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Converter
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className={getCardClasses()}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Mail className="w-6 h-6" />
            Get in Touch
          </h2>
          
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-600 flex items-center justify-center">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
              <p className="opacity-75">Thanks for reaching out. I'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={getInputClasses()}
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={getInputClasses()}
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className={getInputClasses()}
                  placeholder="Tell me about your project or question..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${getButtonClasses()} w-full justify-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className={getCardClasses()}>
            <h3 className="text-xl font-semibold mb-4">About PathBender</h3>
            <p className="opacity-90 leading-relaxed mb-4">
              PathBender was built to solve the everyday frustration of working with file paths 
              across different operating systems and programming environments. Whether you're a 
              developer, system administrator, or power user, this tool streamlines path conversion 
              with intelligent formatting and one-click copying.
            </p>
            <p className="opacity-75 text-sm">
              Built with modern web technologies for speed, reliability, and accessibility.
            </p>
          </div>

          <div className={getCardClasses()}>
            <h3 className="text-xl font-semibold mb-4">Connect</h3>
            <div className="space-y-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-current hover:bg-opacity-10 transition-all duration-200"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-current hover:bg-opacity-10 transition-all duration-200"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-current hover:bg-opacity-10 transition-all duration-200"
              >
                <Twitter className="w-5 h-5" />
                <span>Twitter</span>
              </a>
            </div>
          </div>

          <div className={getCardClasses()}>
            <h3 className="text-xl font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>• Real-time path format conversion</li>
              <li>• Intelligent escape character handling</li>
              <li>• One-click clipboard integration</li>
              <li>• 8 beautiful developer themes</li>
              <li>• Mobile-responsive design</li>
              <li>• Keyboard shortcuts support</li>
              <li>• Automatic format detection</li>
              <li>• Unicode and special character support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}