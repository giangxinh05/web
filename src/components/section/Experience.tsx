import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Calendar, MapPin } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { usePortfolio } from '../../contexts/PortfolioContext';
import type { Experience } from '../../config/portfolioService';

const defaultExperiences: Experience[] = [
  {
    title: "Learning Designer",
    company: "Lisburn Academy",
    location: "Hanoi, Vietnam",
    period: "Aug 2025 - Jan 2026",
    description: [
      "Collaborated with the academic department to build an English language program. Collected and analyzed student baseline data to propose personalized learning pathways.",
      "Created instructional slide decks and detailed Excel tracking roadmaps for a group of 10 students requiring foundational remediation.",
    ]
  },
  {
    title: "Learning Content Developer",
    company: "VTV (Vietnam National Television)",
    location: "Hanoi, Vietnam",
    period: "Feb 2025 - Aug 2025",
    description: [
      "Drafted educational broadcast scripts for the VTV7 channel, integrating content into the educational television program workflow.",
      "Collaborated with the production team using professional filming equipment to develop educational content, contributing to 2 major television programs on the channel.",
    ]
  },
  {
    title: "E-learning Developer",
    company: "HUSCO - S3 JSC (Vietnam National University)",
    location: "Hanoi, Vietnam",
    period: "Jun 2024 - Dec 2024",
    description: [
      "Produced and edited 2nd-grade science lecture videos using CapCut across 2 academic semesters; wrote digitization scripts to improve remote learning accessibility.",
      "Co-organized STEM events at international schools including Marie Curie and coordinated the \"International Drone Coding Competition 2024\" with FKA Korea — managing nearly 200 contestants from 4 countries.",
    ]
  },
  {
    title: "Teaching Assistant",
    company: "TEKY Academy",
    location: "Hanoi, Vietnam",
    period: "Jun 2023 - Dec 2023",
    description: [
      "Assisted in delivering programming lessons for elementary students on TEKY's platform, maintaining high interaction and structured learning.",
      "Managed and coordinated 2 classes with over 40 students, maintaining an effective LMS-based learning environment and supporting student performance tracking.",
    ]
  },
  {
    title: "Learning Experience Design Intern",
    company: "Edulive Global Joint Stock Company",
    location: "Hanoi, Vietnam",
    period: "Jun 2022 - Sep 2022",
    description: [
      "Digitized educational materials by converting approximately 3 presentations per day into interactive e-learning modules on the Edulive platform.",
      "Optimized lesson interactivity by integrating multimedia elements based on interaction models and learner preference data.",
    ]
  },
];

const Experience = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const { data } = usePortfolio();
  const experiences: Experience[] = data.experiences ?? defaultExperiences;

  return (
    <section id="experience" className="py-8 relative" style={{
      background: themeColors.background.sections?.experience || themeColors.background.gradient,
      transition: 'background 0.3s ease-in-out'
    }}>
      <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: '60px', background: isDarkMode ? `linear-gradient(180deg, ${themeColors.background.gradientEnd} 0%, transparent 100%)` : `linear-gradient(180deg, ${themeColors.colors.pink[25]} 0%, transparent 100%)`, zIndex: 1 }} />
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '60px', background: isDarkMode ? `linear-gradient(180deg, transparent 0%, ${themeColors.background.gradientEnd} 100%)` : `linear-gradient(180deg, transparent 0%, ${themeColors.colors.white} 100%)`, zIndex: 1 }} />
      <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
        <h2 className="text-4xl font-bold text-center mb-6" style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[500] }}>Experience</h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {experiences.map((exp, index) => (
            <Card key={index} className="border-2 border-pink-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg bg-white/95 dark:bg-gray-800/95">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <CardTitle className="text-2xl" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[400] }}>{exp.title}</CardTitle>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-400 mt-1">{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <Calendar className="h-4 w-4" /><span className="text-sm">{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4" /><span className="text-sm">{exp.location}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <ul className="space-y-1">
                  {exp.description.filter(Boolean).map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2" style={{ color: themeColors.primary }}>•</span>
                      <span className="text-sm" style={{ color: isDarkMode ? themeColors.colors.dark[200] : themeColors.colors.dark[600] }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
