'use client';

import { useState, useEffect, useMemo } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { site } from '@/app/data/site';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  const navItems = useMemo(
    () => [
      { name: 'Home', href: '#hero', id: 'hero' },
      { name: 'About', href: '#about', id: 'about' },
      { name: 'Education', href: '#education', id: 'education' },
      { name: 'Skills', href: '#skills', id: 'skills' },
      { name: 'Projects', href: '#projects', id: 'projects' },
      { name: 'Contact', href: '#contact', id: 'contact' },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const sections = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-16' : 'h-20'
          }`}
        >
          {/* Logo */}
          <a
            href="#hero"
            className="font-display font-black text-lg sm:text-xl uppercase tracking-tight text-foreground"
          >
            {site.name}
            <span className="text-primary">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`relative font-mono text-[11px] uppercase tracking-wider pb-1.5 transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-primary after:transition-all after:duration-300 ${
                  activeSection === item.id
                    ? 'text-foreground after:w-full'
                    : 'text-muted-foreground/70 hover:text-foreground after:w-0 hover:after:w-full'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wide hover:opacity-85 transition-all duration-300"
            >
              Hire me
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen((open) => !open)}
            className="md:hidden relative w-9 h-9 flex items-center justify-center text-foreground"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border">
          <div className="px-6 py-6 flex flex-col gap-1">
            {navItems.map((item, index) => (
              <a
                key={item.id}
                href={item.href}
                onClick={closeMenu}
                className={`flex items-center gap-3 py-3 font-display font-bold uppercase text-2xl tracking-tight transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'text-primary'
                    : 'text-foreground/80 hover:text-foreground'
                }`}
              >
                <span className="font-mono text-xs text-muted-foreground/50">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={closeMenu}
              className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wide hover:opacity-85 transition-all duration-300"
            >
              Hire me
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;