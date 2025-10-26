
import { Heart, Coffee, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/kanileenas', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/leenas-kanistan', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:a.leenaskani09@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative py-16 border-t border-border bg-card/50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-border to-transparent"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand section */}
          <div className="space-y-6 animate-fade-up">
            <div>
              <div className="text-3xl font-display font-bold mb-4 text-gradient hover:scale-105 transition-transform duration-300 cursor-pointer inline-block">
                Leenas
              </div>
              <p className="text-muted-foreground leading-relaxed">
                DevOps Engineer & Mobile Developer passionate about cloud infrastructure, 
                automation, and building scalable solutions.
              </p>
            </div>
            
            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:rotate-12 animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    title={social.label}
                  >
                    <IconComponent size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-6 animate-fade-up delay-200">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Home', 'About', 'Skills', 'Work', 'Contact'].map((link, index) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-2 transform animate-fade-up"
                  style={{ animationDelay: `${0.2 + index * 0.05}s` }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div className="space-y-6 animate-fade-up delay-400">
            <h3 className="text-lg font-semibold text-foreground">Get in Touch</h3>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                Ready to work together?
              </p>
              <a 
                href="mailto:a.leenaskani09@gmail.com"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300 group"
              >
                <Mail size={16} className="group-hover:scale-110 transition-transform duration-300" />
                a.leenaskani09@gmail.com
              </a>
            </div>
            
            {/* Fun fact */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-4">
              <div className="flex items-center gap-2 text-sm">
                <span>Made with</span>
                <Heart size={14} className="text-red-500 animate-pulse" />
                <span>and lots of</span>
                <Coffee size={14} className="text-amber-500 animate-bounce" />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground animate-fade-up delay-600">
            © {currentYear} Leenas Kanistan. All rights reserved.
          </div>
          
          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 animate-fade-up delay-800"
          >
            <span className="text-sm font-medium">Back to top</span>
            <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute bottom-10 left-10 w-20 h-20 bg-primary/5 rounded-full animate-pulse"></div>
      <div className="absolute top-10 right-10 w-16 h-16 bg-accent/5 rounded-full animate-bounce delay-1000"></div>
    </footer>
  );
};

export default Footer;
