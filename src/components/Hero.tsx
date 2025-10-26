
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const fullText = 'DevOps & AWS | Mobile Development | FullStack Development';
  
  useEffect(() => {
    setIsVisible(true);
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-pulse"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-primary/5 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-accent/5 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-1/3 left-1/3 w-8 h-8 bg-primary/20 rounded-full animate-pulse delay-300"></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
        <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mb-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm mb-6 animate-scale-up">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              Welcome to my Portfolio
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-up delay-200">
            <span className="text-muted-foreground block mb-2 animate-slide-in-right">Hello, I'm</span>
            <span className="text-gradient block animate-scale-up delay-300">Leenas Kanistan</span>
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 animate-fade-up delay-500">
            <span className="text-primary">{displayText}</span>
            <span className="animate-pulse text-primary">|</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-up delay-700">
            Motivated Software Engineering undergraduate with hands-on experience in AWS, Docker, Terraform, CI/CD pipelines, and Flutter mobile development
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up delay-1000">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-medium transition-all duration-300 glow hover:scale-105 hover:shadow-lg hover:shadow-primary/25 group"
            >
              <a href="#work" className="flex items-center gap-2">
                View My Work
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce delay-2000">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
