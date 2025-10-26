import React, { useEffect, useMemo, useRef, useState } from "react";
import { Code, Palette, Server, Cloud, Smartphone, Database } from "lucide-react";

type Category = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string; // tailwind gradient suffix e.g. 'from-orange-500 to-red-500'
};

type Skill = {
  name: string;
  level: number; // 0 - 100
  category: string; // must match Category.name
  icon?: React.ComponentType<{ className?: string }>;
  color: string; // gradient for progress bar
};

type TechTag = { name: string; color: string };

type SkillsProps = {
  categories?: Category[];
  skills?: Skill[];
  heading?: string;
  subheading?: string;
  techTags?: TechTag[];
};

const defaultCategories: Category[] = [
  { name: "Cloud & DevOps", icon: Cloud, description: "AWS, Docker, CI/CD", color: "from-orange-500 to-red-500" },
  { name: "Mobile", icon: Smartphone, description: "Flutter & Firebase", color: "from-blue-500 to-cyan-500" },
  { name: "Backend", icon: Server, description: "APIs & Databases", color: "from-green-500 to-emerald-500" },
  { name: "Frontend", icon: Palette, description: "UI Development & React", color: "from-purple-500 to-pink-500" },
  
];

const defaultSkills: Skill[] = [
  // Cloud & DevOps
  { name: "AWS (EC2, S3, RDS)", level: 85, category: "Cloud & DevOps", icon: Cloud, color: "from-orange-500 to-red-500" },
  { name: "Docker & Kubernetes", level: 80, category: "Cloud & DevOps", icon: Server, color: "from-blue-500 to-cyan-500" },
  { name: "Terraform (IaC)", level: 75, category: "Cloud & DevOps", icon: Code, color: "from-purple-500 to-pink-500" },

  // Mobile (MongoDB removed)
  { name: "Flutter/Dart", level: 90, category: "Mobile", icon: Smartphone, color: "from-cyan-500 to-blue-500" },
  { name: "Firebase", level: 85, category: "Mobile", icon: Database, color: "from-yellow-500 to-orange-500" },

  // Backend (Java & Python added)
  { name: "Node.js / Express", level: 80, category: "Backend", icon: Server, color: "from-green-500 to-emerald-500" },
  { name: "Java", level: 78, category: "Backend", icon: Code, color: "from-red-500 to-yellow-500" },
  { name: "Python", level: 82, category: "Backend", icon: Code, color: "from-blue-400 to-cyan-400" },

  // Frontend
  { name: "HTML", level: 95, category: "Frontend", icon: Code, color: "from-orange-500 to-red-500" },
  { name: "Tailwind CSS", level: 90, category: "Frontend", icon: Palette, color: "from-cyan-400 to-blue-400" },
  { name: "JavaScript", level: 92, category: "Frontend", icon: Code, color: "from-yellow-400 to-orange-400" },
  { name: "React", level: 88, category: "Frontend", icon: Code, color: "from-blue-500 to-cyan-500" },

  ];

const defaultTechTags: TechTag[] = [
  { name: "AWS", color: "from-orange-400 to-yellow-500" },
  { name: "Docker", color: "from-blue-500 to-cyan-500" },
  { name: "Kubernetes", color: "from-indigo-500 to-blue-500" },
  { name: "Terraform", color: "from-purple-500 to-pink-500" },
  { name: "Flutter", color: "from-cyan-400 to-blue-500" },
  { name: "Firebase", color: "from-yellow-400 to-orange-500" },
  { name: "Node.js", color: "from-green-500 to-emerald-500" },
  { name: "Java", color: "from-red-500 to-yellow-500" },
  { name: "Python", color: "from-blue-400 to-cyan-400" },
  { name: "HTML", color: "from-orange-500 to-red-500" },
  { name: "Tailwind CSS", color: "from-cyan-400 to-blue-400" },
  { name: "JavaScript", color: "from-yellow-400 to-orange-400" },
  { name: "React", color: "from-blue-400 to-cyan-400" },
];

const Skills: React.FC<SkillsProps> = ({
  categories = defaultCategories,
  skills = defaultSkills,
  heading = "Skills & Expertise",
  subheading = "Technologies I work with to bring ideas to life",
  techTags = defaultTechTags,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const sectionRef = useRef<HTMLElement | null>(null);

  // Group skills by category for rendering cards
  const skillsByCategory = useMemo(() => {
    const map = new Map<string, Skill[]>();
    categories.forEach((c) => map.set(c.name, []));
    skills.forEach((s) => {
      if (!map.has(s.category)) map.set(s.category, []);
      map.get(s.category)!.push(s);
    });
    // sort skills by level desc
    [...map.keys()].forEach((k) => {
      map.set(
        k,
        (map.get(k) || []).sort((a, b) => b.level - a.level)
      );
    });
    return map;
  }, [categories, skills]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate bars gradually
          const names = skills.map((s) => s.name);
          names.forEach((skill, idx) => {
            setTimeout(() => {
              setAnimatedSkills((prev) => (prev.includes(skill) ? prev : [...prev, skill]));
            }, idx * 120);
          });
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [skills]);

  const filters = ["All", ...categories.map((c) => c.name)];
  const visibleCategories = activeFilter === "All"
    ? categories
    : categories.filter((c) => c.name === activeFilter);

  return (
    <section id="skills" className="py-20" ref={sectionRef as any}>
      <div className="max-w-6xl mx-auto px-4">
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-4 text-gradient">
            {heading}
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            {subheading}
          </p>

          {/* Filter buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {filters.map((label) => (
              <button
                key={label}
                onClick={() => setActiveFilter(label)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border
                  ${activeFilter === label
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                    : "bg-white/5 text-white/90 border-white/10 hover:bg-white/10"}`}
                aria-pressed={activeFilter === label}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Category cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {visibleCategories.map((category, index) => {
              const IconComponent = category.icon;
              const catSkills = skillsByCategory.get(category.name) || [];
              return (
                <div
                  key={category.name}
                  className={`group relative overflow-hidden rounded-2xl bg-card border border-border p-6 transition-all duration-500 hover:scale-105 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 ${isVisible ? "opacity-100" : "opacity-0"}`}
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors group-hover:scale-110 transform duration-300">
                      <IconComponent className="text-primary w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-primary group-hover:text-primary transition-colors">{category.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{category.description}</p>

                    <div className="space-y-3">
                      {catSkills.map((skill) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-foreground font-medium text-sm">{skill.name}</span>
                            <span className="text-muted-foreground text-xs">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out transform`}
                              style={{
                                width: animatedSkills.includes(skill.name) ? `${skill.level}%` : "0%",
                                transformOrigin: "left",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Colorful Technology Grid */}
          <div className="bg-card/50 rounded-2xl p-8 border border-border">
            <h3 className="text-2xl font-display font-semibold text-center mb-8 text-foreground">
              Technologies I Use
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-6">
              {techTags.map((tech, index) => (
                <div
                  key={tech.name}
                  className={`group w-20 h-20 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center text-white font-bold text-xs text-center shadow-md hover:scale-110 hover:rotate-3 transition-all duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
                  style={{ animationDelay: `${0.4 + index * 0.05}s` }}
                  aria-label={tech.name}
                >
                  {tech.name}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I'm constantly learning and adapting to new technologies—focused on cloud infrastructure,
              automation, frontend engineering, mobile development, and building full‑stack products.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
