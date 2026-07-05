'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import {
  Globe,
  Smartphone,
  ShoppingCart,
  User,
  ArrowUpRight,
  Github,
  Filter
} from 'lucide-react';
import { site } from '@/app/data/site';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  // Use projects from site data
  const projects = site.projects;

  // Generate categories dynamically from projects
  const getUniqueCategories = () => {
    const categories = projects.map(project => project.category);
    return [...new Set(categories)];
  };

  const uniqueCategories = getUniqueCategories();

  type CategoryType = 'Web Apps' | 'Mobile Apps' | 'E-Commerce' | 'Personal' | 'Web Development' | 'Mobile Development' | 'E-commerce' | 'Portfolio';

  const iconMap: Record<CategoryType, typeof Globe> = {
    'Web Apps': Globe,
    'Mobile Apps': Smartphone,
    'E-Commerce': ShoppingCart,
    'Personal': User,
    'Web Development': Globe,
    'Mobile Development': Smartphone,
    'E-commerce': ShoppingCart,
    'Portfolio': User
  };

  function getCategoryIcon(category: string) {
    return (iconMap as Record<string, typeof Globe>)[category] || Globe;
  }

  const categories = [
    { name: 'All', icon: Filter },
    ...uniqueCategories.map(category => ({
      name: category,
      icon: getCategoryIcon(category)
    }))
  ];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const getCategoryIconComponent = (category: string) => {
    const cat = categories.find(c => c.name === category);
    return cat ? cat.icon : Filter;
  };

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const emptyStateRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Header, filter bar, and CTA — animate once on scroll into view
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
      });

      if (filterBarRef.current) {
        gsap.from(Array.from(filterBarRef.current.children), {
          y: 16,
          opacity: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: { trigger: filterBarRef.current, start: 'top 88%' },
        });
      }

      gsap.from(ctaRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 90%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Project rows — re-runs whenever the filter changes so newly-shown rows
  // animate in too. ScrollTrigger evaluates immediately at creation time, so
  // rows already inside the viewport (e.g. after switching filters without
  // scrolling) reveal right away instead of waiting for a scroll event.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const rows = listRef.current
        ? Array.from(listRef.current.querySelectorAll<HTMLElement>('.project-row'))
        : [];

      rows.forEach((row) => {
        const info = row.querySelector('.project-info');
        const image = row.querySelector('.project-image');
        const isReversed = row.classList.contains('is-reversed');

        if (info) {
          gsap.from(info, {
            x: isReversed ? 40 : -40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 85%' },
          });
        }
        if (image) {
          gsap.from(image, {
            x: isReversed ? -40 : 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 85%' },
          });
        }
      });

      if (filteredProjects.length === 0 && emptyStateRef.current) {
        gsap.from(emptyStateRef.current, {
          y: 16,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    }, listRef);

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <section ref={sectionRef} className="bg-background py-24 sm:py-32" id="projects">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-20"
        >
          <h2 className="font-display font-black uppercase text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.9]">
            Selected Works /
          </h2>
          <div className="lg:max-w-md">
            <p className="eyebrow text-xs text-muted-foreground mb-3">(Projects)</p>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              Thoughtfully crafted digital experiences that blend utility and aesthetics
              into something functional, memorable, and refined.
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div ref={filterBarRef} className="flex flex-wrap gap-3 mb-16">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const projectCount = category.name === 'All'
              ? projects.length
              : projects.filter(p => p.category === category.name).length;
            const isActive = activeFilter === category.name;

            return (
              <button
                key={index}
                onClick={() => setActiveFilter(category.name)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-foreground/70 hover:text-foreground hover:border-foreground/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{category.name}</span>
                <span className="font-mono text-xs opacity-60">{projectCount}</span>
              </button>
            );
          })}
        </div>

        {/* Projects List — numbered, editorial */}
        <div ref={listRef} className="space-y-16 sm:space-y-24 mb-24">
          {filteredProjects.map((project, index) => {
            const CategoryIcon = getCategoryIconComponent(project.category);
            const isEven = index % 2 === 0;
            return (
              <div
                key={project.id}
                className={`project-row grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  isEven ? '' : 'is-reversed lg:[&>*:first-child]:order-2'
                }`}
              >
                {/* Number + Text */}
                <div className="project-info space-y-6">
                  <span className="font-display font-black text-6xl sm:text-8xl text-foreground/15 leading-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="flex items-center gap-2">
                    <CategoryIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="eyebrow text-xs text-muted-foreground">{project.category}</span>
                    <span className="font-mono text-xs text-muted-foreground/60">· {project.date}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed max-w-md">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="font-mono px-3 py-1 border border-border rounded-full text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-85 transition-all duration-300"
                    >
                      Live Demo
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm font-semibold hover:border-foreground/40 transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  </div>
                </div>

                {/* Image */}
                <div className="project-image relative rounded-2xl overflow-hidden border border-border aspect-[4/3]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-fit grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="font-mono px-3 py-1 rounded-full text-xs bg-background/80 border border-border text-muted-foreground backdrop-blur-sm">
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div ref={emptyStateRef} className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full border border-border flex items-center justify-center">
              <Filter className="w-7 h-7 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Projects Found</h3>
            <p className="text-muted-foreground">Try selecting a different category to see more projects.</p>
          </div>
        )}

        {/* Call to Action */}
        <div ref={ctaRef} className="text-center border border-border rounded-2xl p-10 sm:p-14">
          <h3 className="font-display font-black uppercase text-2xl sm:text-3xl tracking-tight mb-4">
            Want to See More?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            These are just a few highlights from my portfolio. I'm always working on new projects
            and experimenting with the latest technologies. Let's connect and discuss your next project!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:${site.email}`}
              className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-85 transition-all duration-300"
            >
              Get In Touch
            </a>
            <a
              href={site.socials.find(s => s.name === 'GitHub')?.href || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full border border-border font-semibold hover:border-foreground/40 transition-all duration-300"
            >
              <Github className="w-4 h-4" />
              View All Projects
            </a>
          </div>
        </div>
      </div>
      {/* Section Divider */}
      <hr className="mt-20 sm:mt-28 border-t border-border" />
    </section>
  );
};

export default ProjectsSection;