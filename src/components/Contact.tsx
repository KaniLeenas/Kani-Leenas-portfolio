
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Github, Linkedin, Send, MessageCircle, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Message sent! ✨",
      description: "Thanks for reaching out. I'll get back to you soon!",
    });
    
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      subtitle: "Send me a message",
      value: "a.leenaskani09@gmail.com",
      href: "mailto:a.leenaskani09@gmail.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Github,
      title: "GitHub",
      subtitle: "Check out my code",
      value: "@kanileenas",
      href: "https://github.com/kanileenas",
      color: "from-gray-600 to-gray-800"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      subtitle: "Let's connect",
      value: "Leenas Kanistan",
      href: "https://linkedin.com/in/leenas-kanistan",
      color: "from-blue-600 to-blue-800"
    },
    {
      icon: Phone,
      title: "Phone",
      subtitle: "Give me a call",
      value: "076 369 7441",
      href: "tel:+94763697441",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-card/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gradient animate-fade-up">
            Contact Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up delay-200">
            Got a question? Send me a message, and I'll get back to you soon.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8 animate-slide-in-right">
            <div>
              <h3 className="text-3xl font-display font-semibold mb-6 text-foreground">Get in Touch</h3>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Have something to discuss? Send me a message, and let's start a conversation.
              </p>
            </div>
            
            <div className="space-y-4">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <a 
                    key={method.title}
                    href={method.href}
                    className={`group flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-up`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors">{method.title}</div>
                      <div className="text-sm text-muted-foreground">{method.subtitle}</div>
                      <div className="text-sm font-medium text-primary">{method.value}</div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Send size={16} className="text-primary" />
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Additional info */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6 animate-fade-up delay-500">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="text-primary" size={20} />
                <h4 className="font-semibold text-foreground">Quick Response</h4>
              </div>
              <p className="text-muted-foreground text-sm">
                I typically respond to messages within 24 hours. For urgent matters, 
                feel free to reach out via phone or LinkedIn.
              </p>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="animate-slide-in-right delay-300">
            <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-500">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-display font-semibold mb-2">Send Message</h3>
                <p className="text-muted-foreground">Fill out the form below to get in touch</p>
              </div>

              <div className="space-y-4">
                <div className="group">
                  <label className="block text-sm font-medium text-foreground mb-2">Your Name</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-background border-border focus:border-primary focus:ring-primary/20 transition-all duration-300 group-hover:border-primary/50"
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-foreground mb-2">Your Email</label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-background border-border focus:border-primary focus:ring-primary/20 transition-all duration-300 group-hover:border-primary/50"
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <Textarea
                    name="message"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-background border-border focus:border-primary focus:ring-primary/20 resize-none transition-all duration-300 group-hover:border-primary/50"
                  />
                </div>
              </div>
              
              <Button 
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                      Send Message
                    </>
                  )}
                </div>
              </Button>

              {/* Form footer */}
              <div className="text-center pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  By sending this message, you agree to be contacted regarding your inquiry.
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-up delay-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm mb-4">
            <MapPin size={16} />
            Based in Homagama, Sri Lanka
          </div>
          <p className="text-muted-foreground">
            Ready to bring your ideas to life? Let's work together to create something amazing.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
