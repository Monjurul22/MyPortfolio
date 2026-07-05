import { useState, useEffect } from 'react';
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Download,
  ArrowUpRight,
  Twitter
} from 'lucide-react';
import { site } from '@/app/data/site';

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % site.roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const getIconForSocial = (name: string) => {
    switch (name.toLowerCase()) {
      case 'github':
        return Github;
      case 'linkedin':
        return Linkedin;
      case 'twitter':
        return Twitter;
      default:
        return Mail;
    }
  };

  const socialLinks = site.socials.map(social => ({
    ...social,
    icon: getIconForSocial(social.name),
    label: social.name
  }));

  // Add email to social links
  socialLinks.push({
    icon: Mail,
    href: `mailto:${site.email}`,
    label: 'Email',
    name: 'Email'
  });

  return (
    <div>
      <section
        id="hero"
        className="relative min-h-screen bg-[var(--cream)] text-[var(--cream-foreground)] flex flex-col overflow-hidden"
      >
        {/* Ambient backdrop: faint editor grid, vignetted at the edges */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--cream-foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--cream-foreground) 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, transparent 0%, var(--cream) 72%)'
          }}
        />

        {/* Top bar */}
        <div
          className={`relative max-w-7xl mx-auto w-full px-6 sm:px-10 pt-8 sm:pt-10 flex items-center justify-between transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <span className="font-mono text-xs sm:text-sm text-[var(--cream-foreground)]/50 tracking-tight">
            {'// Web Developer & Designer'}
          </span>
          <span className="inline-flex items-center gap-2 eyebrow text-xs sm:text-sm text-[var(--cream-foreground)]/70 border border-[var(--cream-foreground)]/15 rounded-full px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Available for work
          </span>
        </div>

        {/* Main content: details left, photo right */}
        <div className="relative flex-1 flex flex-col justify-center">
          <div className="max-w-7xl mx-auto w-full px-6 sm:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
              {/* Left: all text details */}
              <div>
                <h1
                  className={`font-display font-black uppercase leading-[0.85] tracking-tight text-[8vw] sm:text-[8vw] lg:text-[4.5rem] transition-all duration-1000 delay-100 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                >
                  {site.name}
                </h1>

                <div
                  className={`mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 sm:gap-10 items-start transition-all duration-1000 delay-200 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                >
                  <span className="text-3xl text-[var(--cream-foreground)]/40 leading-none">↘</span>

                  <div className="max-w-2xl">
                    <p className="text-lg sm:text-xl leading-relaxed text-[var(--cream-foreground)]/65">
                      {site.about.description.split('.')[0]}. Right now I'm working as a{' '}
                      <span className="font-semibold text-[var(--cream-foreground)]">
                        {site.roles[currentRole]}
                        <span className="ml-0.5 inline-block w-[2px] h-[0.9em] align-middle bg-primary animate-pulse" />
                      </span>
                      , available for freelance projects worldwide.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <button
                        onClick={scrollToProjects}
                        className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[var(--cream-foreground)] text-[var(--cream)] text-sm sm:text-base font-semibold tracking-wide hover:opacity-85 transition-all duration-300"
                      >
                        View My Work
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </button>

                      <a
                        href={site.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 px-7 py-4 rounded-full border border-[var(--cream-foreground)]/20 hover:border-[var(--cream-foreground)]/60 text-sm sm:text-base font-semibold tracking-wide transition-all duration-300"
                      >
                        <Download className="w-4 h-4" />
                        Resume
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: photo */}
              <div
                className={`relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 rounded-[2rem] overflow-hidden border border-[var(--cream-foreground)]/15 transition-all duration-1000 delay-300 ${
                  isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
                }`}
              >
                <img
                  src="https://i.ibb.co/qMvwKD1y/Screenshot-2026-07-05-at-3-03-42.png"
                  alt={site.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />

                {/* Floating location / status badge */}
                <div
                  className={`absolute bottom-4 left-4 right-4 sm:right-auto flex items-center gap-3 rounded-2xl border border-[var(--cream-foreground)]/15 bg-[var(--cream)]/70 backdrop-blur-md px-4 py-3 transition-all duration-1000 delay-500 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                >
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] text-[var(--cream-foreground)]/50 uppercase tracking-wide">
                      Based in
                    </p>
                    <p className="text-sm font-semibold text-[var(--cream-foreground)] leading-tight">
                      {site.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative max-w-7xl mx-auto w-full px-6 sm:px-10 pb-10 sm:pb-12 flex items-end justify-between gap-6">
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-full border border-[var(--cream-foreground)]/15 hover:border-[var(--cream-foreground)]/60 transition-all duration-300"
                  aria-label={social.label}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--cream-foreground)]/60 group-hover:text-[var(--cream-foreground)] transition-colors duration-300" />
                </a>
              );
            })}
          </div>

          <button
            onClick={scrollToProjects}
            className="hidden sm:flex flex-col items-center gap-2 eyebrow text-xs text-[var(--cream-foreground)]/50 hover:text-[var(--cream-foreground)] transition-colors duration-300"
          >
            Scroll to explore
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>

          <div className="text-right">
            <p className="eyebrow text-xs text-[var(--cream-foreground)]/50 mb-1">Currently</p>
            <p className="font-display font-black text-xl sm:text-2xl leading-none">
              {site.roles[currentRole]}
              <span className="ml-1 inline-block w-[3px] h-[0.8em] align-middle bg-primary animate-pulse" />
            </p>
          </div>
        </div>
      </section>
      {/* Section Divider */}
      <hr className="border-t border-border" />
    </div>
  );
};

export default HeroSection;