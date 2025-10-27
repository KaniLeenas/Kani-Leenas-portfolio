import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Code, Heart, Coffee } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ experience: 0, projects: 0, clients: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate counters
          const animateCounter = (target: number, key: keyof typeof counters, duration: number = 2000) => {
            let start = 0;
            const increment = target / (duration / 50);
            const timer = setInterval(() => {
              start += increment;
              if (start >= target) {
                start = target;
                clearInterval(timer);
              }
              setCounters(prev => ({ ...prev, [key]: Math.floor(start) }));
            }, 50);
          };

          setTimeout(() => {
            animateCounter(5, 'experience');
            animateCounter(50, 'projects');
            animateCounter(25, 'clients');
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-card/50" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16 text-gradient animate-fade-up">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <div className="space-y-4">
                <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
                  Hello, I'm <span className="text-primary">Leenas Kanistan</span>
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Software Engineering Student at NSBM Green University | DevOps & AWS Enthusiast 🚀
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm a motivated Software Engineering undergraduate with hands-on experience in AWS (EC2, S3, RDS, IAM), Terraform, Docker, and CI/CD pipelines. I build scalable cloud infrastructure and develop cross-platform mobile apps using Flutter with Firebase integration.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Strong problem-solving skills, Git discipline, and adaptability to new technologies. I take ownership of projects from start to finish, delivering end-to-end solutions with a focus on automation and efficiency.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center space-x-3 group">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse group-hover:scale-125 transition-transform"></div>
                  <span className="text-foreground font-medium">{counters.experience}+ Certifications</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse delay-200 group-hover:scale-125 transition-transform"></div>
                  <span className="text-foreground font-medium">{counters.projects}+ Projects Completed</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse delay-400 group-hover:scale-125 transition-transform"></div>
                  <span className="text-foreground font-medium">{counters.clients}+ Technologies</span>
                </div>
              </div>


              <div className="flex flex-wrap gap-4 pt-6">
                {/* Download CV */}
                <a
                  href="/lovable-uploads/Kani_Leenas_Cv_DevOps_Intern.pdf"
                  download
                  className="inline-block"
                >
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 group">
                    <Download size={18} className="mr-2 group-hover:animate-bounce" />
                    Download CV
                  </Button>
                </a>

                {/* View Projects -> scroll to Portfolio section */}
                <a href="#work" className="inline-block">
                  <Button 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary/10 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                  >
                    View Projects
                  </Button>
                </a>
              </div>
        

              {/* Skills icons */}
              
              <div className="flex flex-wrap gap-4 pt-6">
                <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors group">
                  <Code size={16} className="text-primary group-hover:rotate-12 transition-transform" />
                  <span className="text-sm font-medium">AWS</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors group">
                  <Heart size={16} className="text-primary group-hover:scale-125 transition-transform" />
                  <span className="text-sm font-medium">Flutter</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors group">
                  <Coffee size={16} className="text-primary group-hover:rotate-12 transition-transform" />
                  <span className="text-sm font-medium">Docker</span>
                </div>
                
              </div>
            </div>
            
            <div className={`relative ${isVisible ? 'animate-scale-up delay-500' : 'opacity-0'}`}>
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/10">
                <div className="text-center space-y-6">
                  <div className="relative w-60 h-60 mx-auto">
                    <div className="w-60 h-60 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-4xl font-bold text-primary-foreground animate-pulse hover:animate-spin transition-all duration-500">
                      <img 
<<<<<<< HEAD
                        src="WhatsApp Image 2025-10-19 at 21.16.11_212753b8.jpg" 
=======
                        src="/lovable-uploads/Screenshot213119.png" 
>>>>>>> 7bb86f4 (Fix: image paths; update About, Certificate, Portfolio, Skills)
                        alt="Profile" 
                        className="w-56 h-56 rounded-full object-cover"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-bounce">
                      <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-semibold animate-fade-up">DevOps & Full-Stack Developer</h3>
                  <p className="text-muted-foreground animate-fade-up delay-200">
                    Building cloud infrastructure and DevOps solutions
                  </p>
                  
                  {/* Animated tech stack icons */}
                  <div className="flex justify-center gap-4 pt-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors hover:scale-110 transform cursor-pointer">
                      <span className="text-primary font-bold text-sm">🧑‍💻</span>
                    </div>
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center hover:bg-accent/30 transition-colors hover:scale-110 transform cursor-pointer">
                      <span className="text-accent font-bold text-sm">📱</span>
                    </div>
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors hover:scale-110 transform cursor-pointer">
                      <span className="text-primary font-bold text-sm">☁️</span>
                    </div>
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors hover:scale-110 transform cursor-pointer">
                      <span className="text-primary font-bold text-sm">🌐</span>
                    </div>
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors hover:scale-110 transform cursor-pointer">
                      <span className="text-primary font-bold text-sm">🧠</span>
                    </div>
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors hover:scale-110 transform cursor-pointer">
                      <span className="text-primary font-bold text-sm">🎓</span>
                    </div>
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors hover:scale-110 transform cursor-pointer">
                      <span className="text-primary font-bold text-sm">⚙️</span>
                    </div>
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors hover:scale-110 transform cursor-pointer">
                      <span className="text-primary font-bold text-sm">🚀</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements around the card */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 rounded-full animate-bounce delay-1000"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-accent/10 rounded-full animate-pulse delay-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
