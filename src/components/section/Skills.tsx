'use client';

import type { ReactNode } from 'react';
import { useLayoutEffect, useRef } from 'react';
import { site } from '@/app/data/site';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Skill = { name: string; level: number; color?: string };

const getSkills = (category: keyof typeof site.skills): Skill[] =>
  Object.entries(site.skills[category]).map(([name, data]) => ({
    name,
    level: data.level,
    color: data.color,
  }));

// Qualitative tier instead of a fake-precise percentage — the number still
// drives it, it's just translated into something a reader can actually use.
const getTier = (level: number) => {
  if (level >= 90) return 'Daily driver';
  if (level >= 75) return 'Comfortable';
  if (level >= 60) return 'Familiar';
  return 'Exploring';
};

const getStrengthClass = (level: number) => {
  if (level >= 90) return 'text-foreground font-semibold';
  if (level >= 75) return 'text-foreground/90';
  if (level >= 60) return 'text-foreground/75';
  return 'text-foreground/60';
};

const renderTokens = (skills: Skill[]) =>
  skills.map((skill, i) => (
    <span key={skill.name} className="group relative inline-flex items-baseline">
      <span
        className={`cursor-default border-b border-dashed border-foreground/15 transition-colors duration-200 group-hover:border-primary/70 ${getStrengthClass(
          skill.level
        )}`}
      >
        &quot;{skill.name}&quot;
      </span>
      {i < skills.length - 1 && <span className="text-muted-foreground">,&nbsp;</span>}

      {/* Tooltip */}
      <span className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-popover px-2.5 py-1 font-sans text-[11px] text-muted-foreground opacity-0 shadow-lg transition-all duration-200 group-hover:-top-10 group-hover:opacity-100">
        {getTier(skill.level)}
      </span>
    </span>
  ));

const CodeLine = ({
  n,
  indent = false,
  children,
}: {
  n: number;
  indent?: boolean;
  children?: ReactNode;
}) => (
  <div className="code-line flex gap-4 sm:gap-6">
    <span className="w-5 shrink-0 select-none text-right text-muted-foreground/35 sm:w-6">
      {n}
    </span>
    <div
      className={`flex flex-1 flex-wrap items-baseline gap-x-1 gap-y-2 ${
        indent ? 'pl-4' : ''
      }`}
    >
      {children}
    </div>
  </div>
);

const SkillsSection = () => {
  const frontend = getSkills('frontend');
  const backend = getSkills('backend');
  const database = getSkills('database');
  const tools = getSkills('tools');
  const design = getSkills('design');
  const exploring: Skill[] = [
    { name: 'PostgreSQL', level: 55 },
    { name: 'Docker', level: 55 },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const codeBodyRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
      });

      // Terminal window pops in
      gsap.from(terminalRef.current, {
        y: 24,
        opacity: 0,
        scale: 0.98,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: terminalRef.current, start: 'top 82%' },
      });

      // Each line of "code" types on, one after another
      if (codeBodyRef.current) {
        gsap.from(Array.from(codeBodyRef.current.children), {
          opacity: 0,
          y: 10,
          duration: 0.45,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: { trigger: codeBodyRef.current, start: 'top 78%' },
        });
      }

      gsap.from(hintRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: hintRef.current, start: 'top 95%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-background py-24 sm:py-32" id="skills">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-20"
        >
          <h2 className="font-display font-black uppercase text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.9]">
            What I Know /
          </h2>
          <div className="lg:max-w-md">
            <p className="eyebrow text-xs text-muted-foreground mb-3">(Skills &amp; Technologies)</p>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              The stack I actually reach for, written the way I&apos;d write it.
            </p>
          </div>
        </div>

        {/* Code-styled skills manifest */}
        <div
          ref={terminalRef}
          className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xl shadow-black/30"
        >
          {/* Window chrome */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-popover/50">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">stack.ts</span>
            </div>
            <span className="font-mono text-[10px] px-2 py-1 rounded-md bg-primary/10 text-primary tracking-wide">
              TS
            </span>
          </div>

          {/* Code body */}
          <div
            ref={codeBodyRef}
            className="p-6 sm:p-10 font-mono text-sm sm:text-[15px] leading-[2] overflow-x-auto"
          >
            <CodeLine n={1}>
              <span className="italic text-muted-foreground/70">// stack.ts</span>
            </CodeLine>
            <CodeLine n={2}>&nbsp;</CodeLine>
            <CodeLine n={3}>
              <span className="text-foreground">export const skills = &#123;</span>
            </CodeLine>
            <CodeLine n={4} indent>
              <span className="text-primary">frontend</span>
              <span className="text-muted-foreground">: [</span>
              {renderTokens(frontend)}
              <span className="text-muted-foreground">],</span>
            </CodeLine>
            <CodeLine n={5} indent>
              <span className="text-primary">backend</span>
              <span className="text-muted-foreground">: [</span>
              {renderTokens(backend)}
              <span className="text-muted-foreground">],</span>
            </CodeLine>
            <CodeLine n={6} indent>
              <span className="text-primary">database</span>
              <span className="text-muted-foreground">: [</span>
              {renderTokens(database)}
              <span className="text-muted-foreground">],</span>
            </CodeLine>
            <CodeLine n={7} indent>
              <span className="text-primary">tools</span>
              <span className="text-muted-foreground">: [</span>
              {renderTokens(tools)}
              <span className="text-muted-foreground">],</span>
            </CodeLine>
            <CodeLine n={8} indent>
              <span className="text-primary">design</span>
              <span className="text-muted-foreground">: [</span>
              {renderTokens(design)}
              <span className="text-muted-foreground">],</span>
            </CodeLine>
            <CodeLine n={9}>
              <span className="text-foreground">&#125; as const;</span>
            </CodeLine>
            <CodeLine n={10}>&nbsp;</CodeLine>
            <CodeLine n={11}>
              <span className="italic text-muted-foreground/70">// currently exploring</span>
            </CodeLine>
            <CodeLine n={12}>
              <span className="text-foreground">const next = [</span>
              {renderTokens(exploring)}
              <span className="text-foreground">
                ]
                <span className="ml-0.5 inline-block w-[2px] h-[1em] align-middle bg-primary animate-pulse" />
              </span>
            </CodeLine>
          </div>
        </div>

        <p ref={hintRef} className="eyebrow text-center text-[11px] text-muted-foreground/60 mt-6">
          Hover any technology to see how deep that goes
        </p>
      </div>
      {/* Section Divider */}
      <hr className="mt-20 sm:mt-28 border-t border-border" />
    </section>
  );
};

export default SkillsSection;