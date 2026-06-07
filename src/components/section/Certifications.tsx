import { useState, useEffect } from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { fetchCertifications, type Certification } from '../../config/portfolioService';

const defaultAchievements: Certification[] = [
  { emoji: '🏆', title: 'Outstanding Officer Award', issuer: 'Faculty of Educational Technology, HUST', period: '2021 - 2022', description: 'Awarded by the Dean for outstanding leadership in school-level STEM initiatives and scientific research activities.' },
  { emoji: '🌏', title: 'gPBL International Program', issuer: 'Shibaura Institute of Technology, Japan', period: '2023', description: 'Led a multidisciplinary international student team in Global Project-Based Learning program, building a real-time emotion tracking robot system.' },
  { emoji: '🤖', title: 'AI Prompt Engineering', issuer: 'Anthropic Claude API Integration', period: '2024', description: 'Self-developed AI-powered tools integrating Claude API for educational use cases — automated progress reporting and parent communication.' },
  { emoji: '📺', title: 'VTV7 Educational Content', issuer: 'Vietnam National Television', period: '2025', description: 'Contributed to 2 major television educational programs on VTV7, developing broadcast scripts and collaborating with professional production teams.' },
];

const Certifications = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const [achievements, setAchievements] = useState<Certification[]>(defaultAchievements);

  useEffect(() => {
    fetchCertifications().then(data => { if (data) setAchievements(data); });
  }, []);

  useEffect(() => {
    const onUpdate = () => fetchCertifications().then(data => { if (data) setAchievements(data); });
    window.addEventListener('portfolio_admin_update', onUpdate);
    return () => window.removeEventListener('portfolio_admin_update', onUpdate);
  }, []);

  return (
    <section id="certifications" className="py-8 relative" style={{
      background: themeColors.background.sections?.certifications || themeColors.background.gradient,
      transition: 'background 0.3s ease-in-out'
    }}>
      <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
        <h2 className="text-4xl font-bold text-center mb-2" style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[500] }}>Achievements & Highlights</h2>
        <p className="text-center mb-10 text-gray-600 dark:text-gray-300">Certifications, awards, and milestones along the way 🌟</p>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {achievements.map((item, index) => (
            <div key={index}
              className="rounded-2xl p-5 flex flex-col gap-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.9)',
                border: `1.5px solid ${isDarkMode ? 'rgba(253,213,223,0.15)' : themeColors.colors.pink[100]}`,
              }}>
              <div className="text-3xl">{item.emoji}</div>
              <div>
                <h3 className="font-bold text-base" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[500] }}>{item.title}</h3>
                <p className="text-xs font-medium" style={{ color: isDarkMode ? themeColors.colors.dark[400] : themeColors.colors.dark[500] }}>{item.issuer}{item.period ? ` · ${item.period}` : ''}</p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: isDarkMode ? themeColors.colors.dark[300] : themeColors.colors.dark[600] }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '60px', background: isDarkMode ? `linear-gradient(180deg, transparent 0%, ${themeColors.background.gradientEnd} 100%)` : `linear-gradient(180deg, transparent 0%, ${themeColors.colors.pink[25]} 100%)`, zIndex: 1 }} />
    </section>
  );
};

export default Certifications;
