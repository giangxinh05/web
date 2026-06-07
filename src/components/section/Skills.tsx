import { useEffect, useRef, useState } from "react";
import DomeGallery from "../ui/domegallery";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useThemeColors } from "../../hooks/useThemeColors";
import { withAlpha } from "../../hooks/useThemeColors";
import { techStackIcons } from "../../assets/techstack";
import { usePortfolio } from "../../contexts/PortfolioContext";
import type { SkillBar } from "../../config/portfolioService";

const giangActualTools = [
  { src: techStackIcons.HTML, alt: "HTML" },
  { src: techStackIcons.CSS, alt: "CSS" },
  { src: techStackIcons.JavaScript, alt: "JavaScript" },
  { src: techStackIcons.ReactLight, alt: "React" },
  { src: techStackIcons.TypeScript, alt: "TypeScript" },
  { src: techStackIcons.TailwindCSSLight, alt: "Tailwind CSS" },
  { src: techStackIcons.ViteLight, alt: "Vite" },
  { src: techStackIcons.MongoDB, alt: "MongoDB" },
  { src: techStackIcons.GithubLight, alt: "GitHub" },
  { src: techStackIcons.NotionLight, alt: "Notion" },
  { src: techStackIcons.NpmLight, alt: "npm" },
  { src: techStackIcons.VercelLight, alt: "Vercel" },
];

const defaultSkillBars = [
  { category: "Technical", name: "HTML / CSS", percent: 55 },
  { category: "Technical", name: "JavaScript (vanilla ES modules)", percent: 55 },
  { category: "Technical", name: "Firebase (RTDB, auth)", percent: 60 },
  { category: "Technical", name: "React + TypeScript", percent: 20 },
  { category: "Technical", name: "AI Prompt Engineering (Anthropic API)", percent: 70 },
  { category: "Instructional Design", name: "Instructional Design", percent: 70 },
  { category: "Instructional Design", name: "E-learning Digitization / SCORM", percent: 82 },
  { category: "Instructional Design", name: "Moodle LMS Administration", percent: 70 },
  { category: "Instructional Design", name: "Script Writing for Educational Content", percent: 90 },
  { category: "Instructional Design", name: "Multimedia Production (CapCut)", percent: 70 },
  { category: "Language", name: "English", percent: 70 },
  { category: "Language", name: "Japanese (N4)", percent: 40 },
  { category: "Other", name: "Team Leadership & Event Coordination", percent: 85 },
  { category: "Other", name: "Research & Data Analysis (SPSS)", percent: 70 },
];

const categoryColors: Record<string, string> = {
  "Technical": "#f9a8d4",
  "Instructional Design": "#a5f3fc",
  "Language": "#bbf7d0",
  "Other": "#fde68a",
};

const Skills = () => {
  const [scale, setScale] = useState(0.5);
  const [animatedBars, setAnimatedBars] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const domeContainerRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const { data } = usePortfolio();
  const skillBars: SkillBar[] = data.skills ?? defaultSkillBars;

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      let visibilityRatio = 0;
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const sectionCenter = rect.top + rect.height / 2;
        const windowCenter = windowHeight / 2;
        const distanceFromCenter = Math.abs(sectionCenter - windowCenter);
        const maxDistance = windowHeight / 2 + rect.height / 2;
        visibilityRatio = 1 - (distanceFromCenter / maxDistance);
        visibilityRatio = Math.max(0, Math.min(1, visibilityRatio));
        visibilityRatio = visibilityRatio * visibilityRatio * (3 - 2 * visibilityRatio);
      }
      setScale(0.5 + 0.5 * visibilityRatio);
      if (rect.top < windowHeight * 0.8) setAnimatedBars(true);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = Array.from(new Set(skillBars.map(s => s.category)));

  return (
    <section ref={sectionRef} id="skills" className="min-h-screen py-20 relative" style={{
      background: themeColors.background.sections?.skills || themeColors.background.gradient,
      transition: 'background 0.3s ease-in-out'
    }}>
      <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: '300px', background: isDarkMode ? `linear-gradient(180deg, ${themeColors.background.gradientEnd} 0%, transparent 100%)` : `linear-gradient(180deg, ${themeColors.colors.pink[25]} 0%, transparent 100%)`, zIndex: 1 }} />
      <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
        <h2 className="text-4xl font-bold text-center mb-2" style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[500] }}>Skills</h2>
        <p className="text-center mb-8 text-gray-600 dark:text-gray-300 text-sm">Drag the globe to explore 🌐</p>
<div ref={domeContainerRef} className="relative w-full" style={{ height: '600px', transform: `scale(${scale})`, transformOrigin: 'center center', willChange: 'transform' }}>
          <DomeGallery images={giangActualTools} />
          <div className="absolute inset-0 pointer-events-none" style={{
            background: isDarkMode
              ? `radial-gradient(ellipse at center, transparent 40%, ${withAlpha(themeColors.colors.dark[900], 0.1)} 70%, ${withAlpha(themeColors.colors.dark[900], 0.6)} 90%, ${withAlpha(themeColors.colors.dark[900], 0.8)} 100%)`
              : `radial-gradient(ellipse at center, transparent 40%, ${withAlpha(themeColors.colors.pink[50], 0.1)} 70%, ${withAlpha(themeColors.colors.pink[50], 0.6)} 90%, ${withAlpha(themeColors.colors.pink[50], 0.8)} 100%)`,
            maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 85%)',
          }} />
        </div>
<div className="mt-12 max-w-3xl mx-auto space-y-8" id="skill-bars-container">
          {categories.map((cat) => (
            <div key={cat}>
              <p className="text-sm font-bold mb-3 tracking-wider uppercase" style={{ color: categoryColors[cat] || themeColors.primary }}>
                {cat}
              </p>
              <div className="space-y-3">
                {skillBars.filter(s => s.category === cat).map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs" style={{ color: isDarkMode ? themeColors.colors.dark[200] : themeColors.colors.dark[600] }}>
                        {skill.name}
                      </span>
                      <span className="text-xs font-medium" style={{ color: categoryColors[cat] || themeColors.primary }}>
                        {skill.percent}%
                      </span>
                    </div>
                    <div className="w-full rounded-full overflow-hidden" style={{
                      height: '6px',
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'
                    }}>
                      <div
                        style={{
                          height: '100%',
                          width: animatedBars ? `${skill.percent}%` : '0%',
                          background: `linear-gradient(to right, ${categoryColors[cat] || themeColors.primary}88, ${categoryColors[cat] || themeColors.primary})`,
                          borderRadius: '9999px',
                          transition: `width 0.9s cubic-bezier(0.4,0,0.2,1) ${i * 60}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
