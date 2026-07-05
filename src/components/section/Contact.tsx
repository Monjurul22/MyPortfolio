'use client';

import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { 
  Mail, 
  Phone, 
  Send, 
  MessageCircle,
  CheckCircle,
  AlertCircle,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Mock site data - replace with your actual site data import
const mockSite = {
  email: 'monjurulahamed2244@gmail.com',
  phone: '+880 1821541811',
  location: 'Code Corner, Tech Town 13579',
  socials: [
    { name: 'GitHub', href: 'https://github.com/Monjurul22/My-portfolio' },
    { name: 'LinkedIn', href: '#' }
  ]
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const infoColRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  const services = [
    'Frontend Development',
    'Backend Development',
    'Full Stack Development',
    'UI/UX Design',
    'Mobile Development',
    'Consulting',
    'Other'
  ];

  const handleInputChange = (name: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceSelect = (service: string) => {
    handleInputChange('service', service);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.service || !formData.message) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  // Scroll-triggered entrance for the form, header, and info column
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 32,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
      });

      gsap.from(formCardRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: formCardRef.current, start: 'top 85%' },
      });

      if (infoColRef.current) {
        gsap.from(Array.from(infoColRef.current.children), {
          x: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: infoColRef.current, start: 'top 85%' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Pop the status alert in whenever it appears
  useEffect(() => {
    if (submitStatus && alertRef.current) {
      gsap.fromTo(
        alertRef.current,
        { opacity: 0, y: -10, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [submitStatus]);

  return (
    <section ref={sectionRef} className="bg-background py-20" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-wider uppercase mb-4">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Let's work together
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Have a project in mind? I'd love to hear about it. Send me a message and let's discuss how we can bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card ref={formCardRef} className="rounded-2xl">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
                        First name
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="FirstName"
                        className="w-full px-4 py-3 bg-background border-border rounded-lg placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
                        Last name
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="LastName"
                        className="w-full px-4 py-3 bg-background border-border rounded-lg placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:border-primary"
                      />
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Email address"
                        className="w-full px-4 py-3 bg-background border-border rounded-lg placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                        Phone number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Phone number"
                        className="w-full px-4 py-3 bg-background border-border rounded-lg placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:border-primary"
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">
                      Select a service
                    </Label>
                    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between px-4 py-3 h-auto bg-background border-border rounded-lg text-left hover:bg-background focus-visible:ring-ring focus-visible:border-primary"
                        >
                          <span className={formData.service ? 'text-foreground' : 'text-muted-foreground'}>
                            {formData.service || 'Select a service'}
                          </span>
                          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full max-h-60 overflow-y-auto" align="start">
                        {services.map((service, index) => (
                          <DropdownMenuItem
                            key={index}
                            onClick={() => handleServiceSelect(service)}
                            className="cursor-pointer"
                          >
                            {service}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Type your message here..."
                      rows={6}
                      className="w-full px-4 py-3 bg-background border-border rounded-lg placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:border-primary resize-vertical min-h-[120px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        Send message
                      </>
                    )}
                  </Button>

                  {/* Status Messages */}
                  {submitStatus && (
                    <Alert
                      ref={alertRef}
                      className={`${
                        submitStatus === 'success' 
                          ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                          : 'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}
                    >
                      {submitStatus === 'success' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      <AlertDescription>
                        {submitStatus === 'success' 
                          ? "Message sent successfully! I'll get back to you soon."
                          : "Please fill in all required fields."
                        }
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div ref={infoColRef} className="space-y-8">
              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Phone */}
                <Card className="rounded-xl hover:border-primary/50 transition-colors group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-muted-foreground text-sm mb-1">Phone</h3>
                        <a 
                          href={`tel:${mockSite.phone.replace(/\s/g, '')}`}
                          className="text-foreground font-medium hover:text-primary transition-colors"
                        >
                          {mockSite.phone}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Email */}
                <Card className="rounded-xl hover:border-primary/50 transition-colors group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-muted-foreground text-sm mb-1">Email</h3>
                        <a 
                          href={`mailto:${mockSite.email}`}
                          className="text-foreground font-medium hover:text-primary transition-colors break-all"
                        >
                          {mockSite.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Info */}
              <Card className="rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Let's Connect</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    I'm always interested in discussing new opportunities and projects. 
                    Whether you have a specific project in mind or just want to say hello, 
                    feel free to reach out!
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    Usually responds within 24 hours
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;