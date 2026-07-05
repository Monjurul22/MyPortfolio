'use client';

import type { ReactNode } from 'react';
import { useLayoutEffect, useRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Layers, Code2, Languages } from 'lucide-react';
import { site } from '@/app/data/site';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools' | 'design';

const SKILL_CATEGORIES: SkillCategory[] = ['frontend', 'backend', 'database', 'tools', 'design'];

const ProfileLine = ({ n, children }: { n: number; children?: ReactNode }) => (
  <div className="flex gap-4">
    <span className="w-5 shrink-0 select-none text-right text-muted-foreground/35">{n}</span>
    <div className="flex flex-1 flex-wrap items-baseline gap-x-1 gap-y-1">{children}</div>
  </div>
);

const StatCard = ({
  icon: Icon,
  value,
  label,
  caption,
  live = false,
}: {
  icon?: LucideIcon;
  value: string;
  label: string;
  caption?: string;
  live?: boolean;
}) => (
  <div className="stat-card rounded-xl border border-border p-5 sm:p-6 hover:border-foreground/30 transition-colors duration-300">
    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
      {live ? (
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
        </span>
      ) : Icon ? (
        <Icon className="w-5 h-5 text-primary" />
      ) : null}
    </div>
    <p className="font-display font-black text-2xl sm:text-3xl text-foreground leading-none mb-1.5">
      {value}
    </p>
    <p className="eyebrow text-[10px] text-muted-foreground">{label}</p>
    {caption && <p className="text-xs text-muted-foreground/70 mt-2">{caption}</p>}
  </div>
);

const AboutSection = () => {
  const techCount = SKILL_CATEGORIES.reduce(
    (total, category) => total + Object.keys(site.skills[category]).length,
    0
  );

  const storyFirstChar = site.about.description.charAt(0);
  const storyRest = site.about.description.slice(1);
  const closingLineNumber = site.phone ? 7 : 6;

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const jsonCardRef = useRef<HTMLDivElement>(null);
  const statsHeaderRef = useRef<HTMLParagraphElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);
  const statsFooterRef = useRef<HTMLParagraphElement>(null);
  const eduHeaderRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Section header
      gsap.from(headerRef.current, {
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
      });

      // Story copy
      gsap.from(storyRef.current, {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: storyRef.current, start: 'top 85%' },
      });

      // profile.json card — slides in from the left slightly
      gsap.from(jsonCardRef.current, {
        x: -24,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: jsonCardRef.current, start: 'top 85%' },
      });

      // "At a Glance" label + stat cards stagger + footer line
      gsap.from(statsHeaderRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: statsHeaderRef.current, start: 'top 85%' },
      });

      if (statsGridRef.current) {
        gsap.from(Array.from(statsGridRef.current.children), {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: statsGridRef.current, start: 'top 85%' },
        });
      }

      gsap.from(statsFooterRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: statsFooterRef.current, start: 'top 90%' },
      });

      // Education header
      gsap.from(eduHeaderRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: eduHeaderRef.current, start: 'top 85%' },
      });

      // Timeline line draws downward as you scroll
      const timelineLine = timelineRef.current?.querySelector('.timeline-line');
      if (timelineLine) {
        gsap.fromTo(
          timelineLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top',
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
              end: 'bottom 80%',
              scrub: 0.6,
            },
          }
        );
      }

      // Each education entry alternates in from left/right
      const items = timelineRef.current
        ? Array.from(timelineRef.current.querySelectorAll<HTMLElement>('.edu-item'))
        : [];
      items.forEach((item, index) => {
        const fromX = index % 2 === 0 ? -40 : 40;
        gsap.from(item, {
          x: fromX,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 85%' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-background py-24 sm:py-32" id="about">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-20"
        >
          <h2 className="font-display font-black uppercase text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.9]">
            About Me /
          </h2>
          <div className="lg:max-w-md">
            <p className="eyebrow text-xs text-muted-foreground mb-3">(Introduction)</p>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              I&apos;m a passionate computer science student and aspiring full-stack developer,
              currently pursuing my BSc while completing specialized web development training.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 mb-24 sm:mb-32">
          {/* Left Column - Story + Profile */}
          <div className="space-y-10">
            <div ref={storyRef} className="space-y-5">
              <p className="eyebrow text-xs text-muted-foreground">(My Story)</p>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                <span className="float-left font-display font-black text-6xl sm:text-7xl leading-[0.75] pr-3 pt-1 text-foreground">
                  {storyFirstChar}
                </span>
                {storyRest}
              </p>
            </div>

            {/* Personal info, written the way a dev would write it */}
            <div
              ref={jsonCardRef}
              className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xl shadow-black/20"
            >
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-popover/50">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
                    <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
                    <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">profile.json</span>
                </div>
                <span className="font-mono text-[10px] px-2 py-1 rounded-md bg-primary/10 text-primary tracking-wide">
                  JSON
                </span>
              </div>

              <div className="p-6 font-mono text-sm leading-[2] overflow-x-auto">
                <ProfileLine n={1}>
                  <span className="text-foreground">{'{'}</span>
                </ProfileLine>
                <ProfileLine n={2}>
                  <span className="text-primary">&quot;location&quot;</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-foreground">&quot;{site.location}&quot;</span>
                  <span className="text-muted-foreground">,</span>
                </ProfileLine>
                <ProfileLine n={3}>
                  <span className="text-primary">&quot;email&quot;</span>
                  <span className="text-muted-foreground">:</span>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-foreground hover:text-primary transition-colors duration-200 underline decoration-dashed decoration-foreground/20 underline-offset-4"
                  >
                    &quot;{site.email}&quot;
                  </a>
                  <span className="text-muted-foreground">,</span>
                </ProfileLine>
                <ProfileLine n={4}>
                  <span className="text-primary">&quot;specialization&quot;</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-foreground">&quot;{site.about.specialization}&quot;</span>
                  <span className="text-muted-foreground">,</span>
                </ProfileLine>
                <ProfileLine n={5}>
                  <span className="text-primary">&quot;languages&quot;</span>
                  <span className="text-muted-foreground">: [</span>
                  {site.about.languages.map((lang, i) => (
                    <span key={lang}>
                      <span className="text-foreground">&quot;{lang}&quot;</span>
                      {i < site.about.languages.length - 1 && (
                        <span className="text-muted-foreground">,&nbsp;</span>
                      )}
                    </span>
                  ))}
                  <span className="text-muted-foreground">]{site.phone ? ',' : ''}</span>
                </ProfileLine>
                {site.phone && (
                  <ProfileLine n={6}>
                    <span className="text-primary">&quot;phone&quot;</span>
                    <span className="text-muted-foreground">:</span>
                    <span className="text-foreground">&quot;{site.phone}&quot;</span>
                  </ProfileLine>
                )}
                <ProfileLine n={closingLineNumber}>
                  <span className="text-foreground">{'}'}</span>
                </ProfileLine>
              </div>
            </div>
          </div>

          {/* Right Column - At a Glance */}
          <div className="space-y-8">
            <p ref={statsHeaderRef} className="eyebrow text-xs text-muted-foreground">
              (At a Glance)
            </p>
            <div ref={statsGridRef} className="grid grid-cols-2 gap-4 sm:gap-5">
              <StatCard icon={Layers} value={`${site.projects.length}+`} label="Projects Shipped" />
              <StatCard icon={Code2} value={`${techCount}+`} label="Technologies" />
              <StatCard
                icon={Languages}
                value={`${site.about.languages.length}`}
                label="Languages Spoken"
                caption={site.about.languages.join(' · ')}
              />
              <StatCard live value="Available" label="For Freelance Work" />
            </div>
            <p ref={statsFooterRef} className="text-sm text-muted-foreground">
              Curious about the stack behind it?{' '}
              <a
                href="#skills"
                className="text-foreground underline decoration-dashed decoration-foreground/30 underline-offset-4 hover:text-primary transition-colors duration-200"
              >
                See the full breakdown
              </a>
              .
            </p>
          </div>
        </div>

        {/* Education Timeline */}
        <div id="education" className="space-y-16">
          <div
            ref={eduHeaderRef}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-8"
          >
            <h3 className="font-display font-black uppercase text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none">
              Education /
            </h3>
            <p className="eyebrow text-xs text-muted-foreground lg:max-w-xs">
              (My educational journey and continuous learning path)
            </p>
          </div>

          <div ref={timelineRef} className="relative">
            {/* Timeline Line */}
            <div className="timeline-line absolute left-6 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-px bg-border"></div>

            <div className="space-y-12">
              {site.education.map((edu, index) => (
                <div key={index} className="edu-item relative">
                  {/* Timeline Marker */}
                  <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-9 h-9 rounded-full bg-background border border-border flex items-center justify-center">
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-16 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-14' : 'md:ml-auto md:pl-14'
                    }`}
                  >
                    <div className="border border-border rounded-xl p-6 hover:border-foreground/30 transition-colors duration-300">
                      <p className="eyebrow text-xs text-muted-foreground mb-3">{edu.year}</p>
                      <h4 className="text-lg font-bold text-foreground mb-1">{edu.degree}</h4>
                      <p className="text-foreground/70 font-medium mb-3">{edu.institution}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <hr className="mt-20 sm:mt-28 border-t border-border" />
      </div>
    </section>
  );
};

export default AboutSection;