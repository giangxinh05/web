import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import AsciiMorphText from '../AsciiMorphText';
import TypewriterCarousel from '../TypewriterCarousel';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors, withAlpha } from '../../hooks/useThemeColors';
import { profile1, stickers as stickerImages } from '../../assets';
import { fetchSettings } from '../../config/portfolioService';

const DEFAULT_SUMMARY = 'EdTech & learning experience design professional at HUST. I build AI-powered education tools, interactive e-learning, and digital training solutions that bridge learners and knowledge. Currently exploring the intersection of instructional design and generative AI. 🎓✨';

const About = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [asciiText, setAsciiText] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  const roles = [
    'EdTech Developer',
    'Instructional Designer',
    'Learning Experience Designer',
    'E-learning Developer',
    'AI Integration Enthusiast',
  ];

  const fullAsciiArt = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⢠⡾⠲⠶⣤⣀⣠⣤⣤⣤⡿⠛⠿⡴⠾⠛⢻⡆⠀⠀⠀\n⠀⠀⠀⣼⠁⠀⠀⠀⠉⠁⠀⢀⣿⠐⡿⣿⠿⣶⣤⣤⣷⡀⠀⠀\n⠀⠀⠀⢹⡶⠀⠀⠀⠀⠀⠀⠈⢯⣡⣿⣿⣀⣰⣿⣦⢂⡏⠀⠀\n⠀⠀⢀⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠹⣍⣭⣾⠁⠀⠀\n⠀⣀⣸⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣸⣧⣤⡀\n⠈⠉⠹⣏⡁⠀⢸⣿⠀⠀⠀⢀⡀⠀⠀⠀⣿⠆⠀⢀⣸⣇⣀⠀\n⠀⠐⠋⢻⣅⡄⢀⣀⣀⡀⠀⠯⠽⠂⢀⣀⣀⡀⠀⣤⣿⠀⠉⠀\n⠀⠀⠴⠛⠙⣳⠋⠉⠉⠙⣆⠀⠀⢰⡟⠉⠈⠙⢷⠟⠈⠙⠂⠀\n⠀⠀⠀⠀⠀⢻⣄⣠⣤⣴⠟⠛⠛⠛⢧⣤⣤⣀⡾⠀⠀⠀⠀⠀`;

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 3;
    const typeWriter = () => {
      if (currentIndex < fullAsciiArt.length) {
        setAsciiText(fullAsciiArt.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeWriter, typingSpeed);
      }
    };
    const startDelay = setTimeout(() => { typeWriter(); }, 500);
    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!sectionRef.current) { ticking = false; return; }
          const rect = sectionRef.current.getBoundingClientRect();
          const sectionHeight = rect.height;
          const windowHeight = window.innerHeight;
          const visibleTop = Math.max(0, -rect.top);
          const visibleBottom = Math.min(sectionHeight, windowHeight - rect.top);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const progress = visibleHeight / windowHeight;
          setScrollProgress(Math.min(1, Math.max(0, progress)));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stickers = [
    { id: 1, image: stickerImages[0], initialX: -180, initialY: -80, finalX: -550, finalY: -100, mobileInitialX: -120, mobileInitialY: -60, mobileFinalX: -250, mobileFinalY: -80 },
    { id: 2, image: stickerImages[1], initialX: 180, initialY: -60, finalX: 600, finalY: -250, mobileInitialX: 120, mobileInitialY: -40, mobileFinalX: 200, mobileFinalY: -120 },
    { id: 3, image: stickerImages[2], initialX: -160, initialY: 240, finalX: -200, finalY: 380, mobileInitialX: -100, mobileInitialY: 160, mobileFinalX: -120, mobileFinalY: 220 },
    { id: 4, image: stickerImages[3], initialX: 190, initialY: 260, finalX: 500, finalY: 150, mobileInitialX: 110, mobileInitialY: 180, mobileFinalX: 180, mobileFinalY: 120 },
    { id: 5, image: stickerImages[4], initialX: -200, initialY: 120, finalX: -200, finalY: -380, mobileInitialX: -130, mobileInitialY: 80, mobileFinalX: -130, mobileFinalY: -180 },
    { id: 6, image: stickerImages[5], initialX: 170, initialY: 100, finalX: 150, finalY: -360, mobileInitialX: 110, mobileInitialY: 70, mobileFinalX: 100, mobileFinalY: -160 },
    { id: 7, image: stickerImages[6], initialX: -130, initialY: -130, finalX: -450, finalY: -380, mobileInitialX: -90, mobileInitialY: -90, mobileFinalX: -200, mobileFinalY: -200 },
    { id: 8, image: stickerImages[7], initialX: 150, initialY: 200, finalX: 200, finalY: 350, mobileInitialX: 100, mobileInitialY: 140, mobileFinalX: 130, mobileFinalY: 200 },
    { id: 9, image: stickerImages[8], initialX: -140, initialY: 300, finalX: -500, finalY: 200, mobileInitialX: -90, mobileInitialY: 200, mobileFinalX: -180, mobileFinalY: 160 },
    { id: 10, image: stickerImages[9], initialX: 200, initialY: 120, finalX: 500, finalY: -380, mobileInitialX: 130, mobileInitialY: 80, mobileFinalX: 200, mobileFinalY: -180 },
    { id: 11, image: stickerImages[10], initialX: -220, initialY: -40, finalX: 600, finalY: 10, mobileInitialX: -140, mobileInitialY: -30, mobileFinalX: 220, mobileFinalY: 10 },
    { id: 12, image: stickerImages[11], initialX: 110, initialY: -180, finalX: 500, finalY: 300, mobileInitialX: 80, mobileInitialY: -120, mobileFinalX: 180, mobileFinalY: 180 },
    { id: 13, image: stickerImages[12], initialX: -120, initialY: 360, finalX: 500, finalY: -100, mobileInitialX: -80, mobileInitialY: 240, mobileFinalX: 180, mobileFinalY: -80 },
    { id: 14, image: stickerImages[13], initialX: 210, initialY: 40, finalX: -640, finalY: -220, mobileInitialX: 140, mobileInitialY: 30, mobileFinalX: -220, mobileFinalY: -140 },
    { id: 15, image: stickerImages[14], initialX: -100, initialY: 160, finalX: -400, finalY: 320, mobileInitialX: -70, mobileInitialY: 110, mobileFinalX: -150, mobileFinalY: 200 },
    { id: 16, image: stickerImages[15], initialX: 130, initialY: -100, finalX: -600, finalY: 100, mobileInitialX: 90, mobileInitialY: -70, mobileFinalX: -200, mobileFinalY: 80 },
  ];

  const getStickerStyle = (sticker: typeof stickers[0]) => {
    const progress = scrollProgress;
    const isMobile = window.innerWidth < 768;
    const isVerySmall = window.innerWidth < 375;
    const initialX = isMobile ? sticker.mobileInitialX : sticker.initialX;
    const initialY = isMobile ? sticker.mobileInitialY : sticker.initialY;
    const finalX = isMobile ? sticker.mobileFinalX : sticker.finalX;
    const finalY = isMobile ? sticker.mobileFinalY : sticker.finalY;
    const constrainedFinalX = isVerySmall ? Math.max(-100, Math.min(100, finalX * 0.3)) : isMobile ? Math.max(-150, Math.min(150, finalX * 0.5)) : finalX;
    const constrainedFinalY = isVerySmall ? finalY * 0.6 : finalY * 0.8;
    const x = initialX + (constrainedFinalX - initialX) * progress;
    const y = initialY + (constrainedFinalY - initialY) * progress;
    const scale = isVerySmall ? 0.4 + (0.15 * progress) : isMobile ? 0.6 + (0.2 * progress) : 0.8 + (0.4 * progress);
    const opacity = 0.9 + (0.1 * progress);
    const rotation = progress * 20;
    return {
      transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotation}deg)`,
      opacity,
      transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
      willChange: 'transform, opacity',
      width: isVerySmall ? '50px' : isMobile ? '60px' : '80px',
      height: isVerySmall ? '50px' : isMobile ? '60px' : '80px',
      filter: `drop-shadow(0 4px 8px ${themeColors.effects.dropShadow})`
    };
  };

  const [summaryText, setSummaryText] = useState(DEFAULT_SUMMARY);

  useEffect(() => {
    fetchSettings().then(data => { if (data?.summary) setSummaryText(data.summary); });
  }, []);

  useEffect(() => {
    const onUpdate = () => fetchSettings().then(data => { if (data?.summary) setSummaryText(data.summary); });
    window.addEventListener('portfolio_admin_update', onUpdate);
    return () => window.removeEventListener('portfolio_admin_update', onUpdate);
  }, []);

  const textColor = isDarkMode ? '#e2e8f0' : '#3d2b2b';
  const labelColor = isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[600];

  return (
    <section id="about" ref={sectionRef} className="min-h-screen" style={{
      background: themeColors.background.sections?.about || themeColors.background.gradient,
      transition: 'background 0.3s ease-in-out',
      width: '100%',
      maxWidth: '100vw',
      contain: 'layout style'
    }}>
<div className="py-10 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start max-w-6xl mx-auto gap-8">
            <div className="text-left w-full md:w-auto">
              <div className="ascii-container justify-start text-3xl md:text-4xl lg:text-5xl">
                <AsciiMorphText text="Hi, I'm Giang 🌸" />
              </div>
              <div className="hero-subtitle justify-start text-base md:text-lg lg:text-xl mt-2">
                <div className="flex flex-wrap items-center justify-start">
                  <span className={isDarkMode ? 'hero-subtitle-dark' : 'hero-subtitle-light'}>I am a&nbsp;</span>
                  <TypewriterCarousel roles={roles} className={isDarkMode ? 'hero-subtitle-dark' : 'hero-subtitle-light'} />
                </div>
              </div>
              <p className="mt-4 max-w-lg text-sm md:text-base leading-relaxed" style={{ color: isDarkMode ? themeColors.colors.dark[300] : themeColors.colors.dark[600] }}>
                EdTech & learning experience design professional at HUST. Passionate about AI-powered education tools,
                instructional design, and building tech that bridges learners and knowledge. 🎓✨
              </p>
              <div className="hero-buttons flex justify-start gap-3 mt-4">
                <button className="hero-action-btn text-sm md:text-base px-4 py-2 md:px-5 md:py-2.5"
                  onClick={() => { window.open('/web/resume.pdf', '_blank'); }}>
                  Resume →
                </button>
                <Link to="/contact" className="hero-action-btn text-sm md:text-base px-4 py-2 md:px-5 md:py-2.5">
                  Contact →
                </Link>
              </div>
            </div>
            <div className="hidden md:block" style={{ fontSize: '0.8rem', lineHeight: '1', fontFamily: 'monospace', minHeight: '150px', color: isDarkMode ? themeColors.primary : themeColors.colors.pink[500] }}>
              <pre>{asciiText}</pre>
            </div>
          </div>
        </div>
      </div>
<div className="py-8 md:py-12" style={{
        background: isDarkMode
          ? 'transparent'
          : `linear-gradient(180deg, transparent 0%, ${withAlpha(themeColors.colors.pink[50], 0.5)} 50%, ${themeColors.colors.pink[25]} 100%)`
      }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center relative min-h-[400px] md:min-h-[600px]">
<div className="absolute inset-0 flex items-center justify-center">
              {stickers.map((sticker) => {
                const isVerySmall = window.innerWidth < 375;
                const isMobile = window.innerWidth < 768;
                return (
                  <img key={sticker.id} src={sticker.image} alt=""
                    className="absolute z-10 pointer-events-none select-none"
                    style={getStickerStyle(sticker)}
                    loading={sticker.id <= 4 ? "eager" : "lazy"}
                    decoding="async"
                    width={isVerySmall ? "50" : isMobile ? "60" : "80"}
                    height={isVerySmall ? "50" : isMobile ? "60" : "80"}
                  />
                );
              })}
            </div>
<div className="w-full md:max-w-3xl lg:max-w-5xl relative z-20 px-1 md:px-0">
<div className="relative w-full" style={{
                borderRadius: '4px 12px 12px 4px',
                boxShadow: isDarkMode
                  ? '0 8px 40px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(253,213,223,0.1)'
                  : '0 8px 40px rgba(180,120,130,0.25), inset 0 0 0 1px rgba(200,139,149,0.15)',
                display: 'flex',
                overflow: 'hidden',
                minHeight: '380px',
              }}>
<div className="flex-1 relative flex items-center justify-center" style={{
                  background: isDarkMode
                    ? 'linear-gradient(135deg, #1a2540 0%, #1e2d4a 100%)'
                    : 'linear-gradient(135deg, #fff9fb 0%, #fff0f4 100%)',
                  borderRight: isDarkMode ? '2px solid rgba(253,213,223,0.12)' : '2px solid rgba(200,139,149,0.2)',
                  padding: '24px 16px',
                  minHeight: '380px',
                }}>
<div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: isDarkMode
                      ? 'repeating-linear-gradient(transparent, transparent 27px, rgba(253,213,223,0.06) 28px)'
                      : 'repeating-linear-gradient(transparent, transparent 27px, rgba(200,139,149,0.12) 28px)',
                    backgroundSize: '100% 28px',
                    backgroundPositionY: '8px',
                  }} />
<span className="absolute bottom-3 left-4 text-xs" style={{ color: isDarkMode ? 'rgba(253,213,223,0.3)' : 'rgba(200,139,149,0.5)', fontFamily: 'serif' }}>01</span>

                  {profile1 ? (
                    <div className="relative flex flex-col items-center gap-3">
                      <div style={{
                        borderRadius: '50%',
                        overflow: 'hidden',
                        width: 'clamp(120px, 18vw, 200px)',
                        height: 'clamp(120px, 18vw, 200px)',
                        border: isDarkMode ? '3px solid rgba(253,213,223,0.3)' : '3px solid rgba(200,139,149,0.3)',
                        boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.5)' : '0 4px 24px rgba(180,120,130,0.2)',
                        flexShrink: 0,
                      }}>
                        <img
                          src={profile1}
                          alt="Giang's profile photo"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          loading="eager"
                        />
                      </div>
                      <p className="text-center text-sm font-medium" style={{
                        color: isDarkMode ? 'rgba(253,213,223,0.7)' : 'rgba(180,100,120,0.8)',
                        fontFamily: 'serif',
                        fontStyle: 'italic',
                      }}>Bui Tong Giang 🌸</p>
                    </div>
                  ) : (
                    <div className="text-5xl select-none">🌸</div>
                  )}
                </div>
<div style={{
                  width: '8px',
                  flexShrink: 0,
                  background: isDarkMode
                    ? 'linear-gradient(to right, rgba(0,0,0,0.4), rgba(253,213,223,0.05), rgba(0,0,0,0.2))'
                    : 'linear-gradient(to right, rgba(180,120,130,0.15), rgba(255,255,255,0.8), rgba(180,120,130,0.1))',
                }} />
<div className="flex-1 relative flex flex-col justify-center" style={{
                  background: isDarkMode
                    ? 'linear-gradient(135deg, #1e2d4a 0%, #1a2540 100%)'
                    : 'linear-gradient(135deg, #fff0f4 0%, #fff9fb 100%)',
                  padding: '28px 20px 28px 16px',
                  minHeight: '380px',
                }}>
<div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: isDarkMode
                      ? 'repeating-linear-gradient(transparent, transparent 27px, rgba(253,213,223,0.06) 28px)'
                      : 'repeating-linear-gradient(transparent, transparent 27px, rgba(200,139,149,0.12) 28px)',
                    backgroundSize: '100% 28px',
                    backgroundPositionY: '8px',
                  }} />
<div className="absolute top-0 bottom-0 pointer-events-none" style={{
                    left: '28px',
                    width: '1px',
                    background: isDarkMode ? 'rgba(253,100,100,0.2)' : 'rgba(220,100,100,0.25)',
                  }} />
<span className="absolute bottom-3 right-4 text-xs" style={{ color: isDarkMode ? 'rgba(253,213,223,0.3)' : 'rgba(200,139,149,0.5)', fontFamily: 'serif' }}>02</span>

                  <div className="relative pl-6">
                    <p className="text-xs font-bold mb-3 tracking-widest uppercase" style={{ color: labelColor }}>
                      About Me ✦
                    </p>
                    <p id="about-summary-text" className="text-sm leading-relaxed" style={{
                      color: textColor,
                      fontFamily: 'serif',
                      fontStyle: 'italic',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}>
                      {summaryText}
                    </p>
<div className="flex flex-wrap gap-2 mt-4">
                      {[
                        { icon: '🎓', label: 'HUST · EdTech' },
                        { icon: '📍', label: 'Hanoi, VN' },
                        { icon: '🤖', label: 'AI × Education' },
                      ].map((pill, i) => (
                        <span key={i} className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full" style={{
                          background: isDarkMode ? 'rgba(253,213,223,0.08)' : 'rgba(200,139,149,0.1)',
                          color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[600],
                          border: isDarkMode ? '1px solid rgba(253,213,223,0.15)' : '1px solid rgba(200,139,149,0.2)',
                        }}>
                          {pill.icon} {pill.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
