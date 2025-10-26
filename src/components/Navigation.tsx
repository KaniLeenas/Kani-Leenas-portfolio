
import { useState, useEffect } from 'react';
import { Menu, X, Home, User, Code, Briefcase, Mail } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills','Certificate', 'work', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Code },
    { name: 'Work', href: '#work', icon: Briefcase },
    { name: 'Certificate', href: '#Certificate', icon: Code },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-display font-bold text-gradient hover:scale-105 transition-transform duration-300 cursor-pointer">
              <span className="inline-block hover:rotate-12 transition-transform duration-300">Kani</span>Leenas
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.href.slice(1);
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                      isActive
                        ? 'text-primary bg-primary/10 scale-105'
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    <IconComponent size={16} className={`transition-transform duration-300 ${
                      isActive ? 'scale-110' : 'group-hover:scale-110'
                    }`} />
                    {item.name}
                    <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 ${
                      isActive ? 'w-1/2' : 'group-hover:w-1/2'
                    }`}></span>
                  </button>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors duration-300 hover:bg-primary/10 rounded-lg"
              >
                <div className="relative">
                  <Menu 
                    size={24} 
                    className={`transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} 
                  />
                  <X 
                    size={24} 
                    className={`absolute top-0 left-0 transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} 
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden transition-all duration-500 overflow-hidden ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="px-2 pt-2 pb-6 space-y-2 bg-card/95 border border-border rounded-2xl mt-2 backdrop-blur-xl">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.href.slice(1);
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                      isActive
                        ? 'text-primary bg-primary/10 scale-105'
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                    } animate-fade-up`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <IconComponent size={18} className="transition-transform duration-300 hover:scale-110" />
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Floating navigation indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col gap-3">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`group relative w-3 h-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-primary scale-125'
                    : 'bg-muted-foreground/30 hover:bg-primary/50 hover:scale-110'
                }`}
                title={item.name}
              >
                <span className={`absolute right-6 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-card border border-border rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  isActive || 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                }`}>
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navigation;
