
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLinkIcon, Github, Eye, Star, GitBranch } from 'lucide-react';

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

  const projects = [
    {
      title: 'Doctor Booking App',
      description: 'Mobile app for finding doctors, scheduling appointments with Firebase Auth, Firestore, and push notifications',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
      tech: ['Flutter', 'Firebase', 'FCM', 'Firestore'],
      category: 'Mobile App',
      github: 'https://github.com/kanileenas',
      demo: '#',
      stars: 32,
      forks: 12
    },
    {
      title: 'Hotel Booking App',
      description: 'App for searching hotels and managing reservations with Firebase backend and REST APIs integration',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
      tech: ['Flutter', 'Firebase', 'REST API', 'Dio'],
      category: 'Mobile App',
      github: 'https://github.com/kanileenas',
      demo: '#',
      stars: 28,
      forks: 9
    },
    {
      title: 'E-Commerce DevOps Pipeline',
      description: 'Full DevOps pipeline for microservices e-commerce with AWS, Terraform, Docker, Kubernetes, and GitOps using ArgoCD',
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop',
      tech: ['AWS', 'Terraform', 'Kubernetes', 'ArgoCD'],
      category: 'DevOps',
      github: 'https://github.com/kanileenas',
      demo: '#',
      stars: 45,
      forks: 15
    },
    {
      title: 'CI/CD Automation',
      description: 'Automated build, test, and deployment pipelines using GitHub Actions and Jenkins for continuous delivery',
      image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop',
      tech: ['GitHub Actions', 'Jenkins', 'Docker', 'Bash'],
      category: 'DevOps',
      github: 'https://github.com/kanileenas',
      demo: '#',
      stars: 38,
      forks: 11
    },
    {
      title: 'AWS Cloud Infrastructure',
      description: 'Scalable cloud infrastructure deployment using AWS services (EC2, S3, RDS, VPC, Route 53) with Terraform IaC',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
      tech: ['AWS', 'Terraform', 'VPC', 'Route 53'],
      category: 'DevOps',
      github: 'https://github.com/kanileenas',
      demo: '#',
      stars: 52,
      forks: 18
    },
    {
      title: 'Monitoring Dashboard',
      description: 'System monitoring and alerting dashboards using Prometheus and Grafana for real-time application reliability',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      tech: ['Prometheus', 'Grafana', 'Monitoring', 'Alerts'],
      category: 'DevOps',
      github: 'https://github.com/kanileenas',
      demo: '#',
      stars: 24,
      forks: 7
    },
    {
      title: 'Hotel Booking App',
      description: 'App for searching hotels and managing reservations with Firebase backend and REST APIs integration',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
      tech: ['React', 'Tailwin', 'MongoDb', 'Node js'],
      category: 'FullStack',
      github: 'https://github.com/kanileenas',
      demo: '#',
      stars: 20,
      forks: 6
    },
  ];

  const filters = ['All', 'DevOps', 'Mobile App','FullStack'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="work" className="py-20 bg-card/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gradient">
              Portfolio Showcase
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore my journey through projects, certifications, and technical expertise. Each section represents a milestone in my continuous learning path.
            </p>
            
            {/* Project stats */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{projects.length}</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">5</div>
                <div className="text-sm text-muted-foreground">Certifications</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">20+</div>
                <div className="text-sm text-muted-foreground">Technologies</div>
              </div>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-card border border-border rounded-xl p-1">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.title}
                className={`group relative bg-card border border-border rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 ${
                  isVisible ? 'animate-scale-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  {/* Overlay with quick actions */}
                  <div className={`absolute inset-0 flex items-center justify-center gap-4 transition-all duration-500 ${
                    hoveredProject === index ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <Button 
                      size="sm" 
                      className="bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm transition-all duration-300 hover:scale-110"
                    >
                      <Eye size={16} className="mr-2" />
                      Preview
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-card/90 border-primary/50 backdrop-blur-sm transition-all duration-300 hover:scale-110"
                    >
                      <Github size={16} className="mr-2" />
                      Code
                    </Button>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="flex items-center gap-1 px-2 py-1 bg-card/90 border border-border/50 rounded-lg backdrop-blur-sm">
                      <Star size={12} className="text-yellow-500" />
                      <span className="text-xs font-medium">{project.stars}</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-card/90 border border-border/50 rounded-lg backdrop-blur-sm">
                      <GitBranch size={12} className="text-muted-foreground" />
                      <span className="text-xs font-medium">{project.forks}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={tech}
                        className={`px-3 py-1 bg-gradient-to-r from-primary/10 to-accent/10 text-primary rounded-full text-xs font-medium border border-primary/20 transition-all duration-300 hover:scale-110 hover:bg-primary/20 ${
                          isVisible ? 'animate-fade-in' : 'opacity-0'
                        }`}
                        style={{ animationDelay: `${index * 0.1 + techIndex * 0.05}s` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
                    >
                      <Github size={14} className="mr-2" />
                      Code
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                    >
                      <ExternalLinkIcon size={14} className="mr-2" />
                      Demo
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              View All Projects
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
