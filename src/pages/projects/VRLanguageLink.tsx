import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import vrApp from '../../assets/vr_ll_app.png';
import vr360 from '../../assets/vr_ll_360.png';
import vrStudio from '../../assets/vr_ll_studio.png';
import vrProcess from '../../assets/vr_ll_process.png';

const VRLanguageLink = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  const cardBg = isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.9)';
  const cardBorder = isDarkMode ? 'rgba(253,213,223,0.15)' : themeColors.colors.pink[100];
  const heading = isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[500];
  const body = isDarkMode ? themeColors.colors.dark[200] : themeColors.colors.dark[600];
  const muted = isDarkMode ? themeColors.colors.dark[300] : themeColors.colors.dark[500];

  const stack = [
    { label: 'Camera', value: 'Insta360 X3' },
    { label: 'Editing', value: 'Insta360 Studio 2021' },
    { label: 'Video editor', value: 'CapCut' },
    { label: 'Publishing', value: 'Thinglink (branching interactions)' },
    { label: 'Methodology', value: 'Instructional Design · Branching Scenario' },
  ];

  const outcomes = [
    { emoji: '🎯', text: '5 branching VR360 scenarios simulating real sales objections — pricing concerns, competitor comparison, scheduling conflicts' },
    { emoji: '📈', text: 'Post-training survey showed measurable improvement in staff confidence and consultation effectiveness' },
    { emoji: '💼', text: 'Program subsequently licensed to Unikorm JSC for commercial use' },
    { emoji: '⏱️', text: 'Reduced employee training time by 33% compared to the previous in-person format' },
  ];

  const process = [
    { step: '01', title: 'Khảo sát', desc: 'Conducted needs analysis through direct surveys and interviews with sales staff and team leads.' },
    { step: '02', title: 'Phân tích nhu cầu', desc: 'Identified 4 core skill gaps: customer psychology, persuasion, time management, and problem-solving.' },
    { step: '03', title: 'Xây dựng khung chương trình', desc: 'Designed a 2-month blended online training program comprising 20 short-form videos (8–12 min each) across 4 thematic modules.' },
    { step: '04', title: 'Xây dựng kịch bản đào tạo', desc: 'Wrote branching scenario scripts for each VR360 scene — each presenting an optimal and suboptimal response path.' },
    { step: '05', title: 'Quay video', desc: 'Produced immersive 360° scenario videos using an Insta360 X3 camera in real office environments.' },
    { step: '06', title: 'Biên tập video', desc: 'Edited in Insta360 Studio and CapCut; stitched, color-corrected, and exported equirectangular footage.' },
    { step: '07', title: 'Triển khai trực tiếp', desc: 'Published on Thinglink with branching interactions — giving learners immediate feedback on their choices.' },
    { step: '08', title: 'Thu kết quả', desc: 'Collected post-training survey data from the 10-person sales team.' },
    { step: '09', title: 'Tổng hợp & Đánh giá', desc: 'Synthesized results, documented outcomes, and prepared the program for commercial licensing.' },
  ];

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: isDarkMode ? '#101727' : '#fdf6f9', color: isDarkMode ? '#f3e8ff' : '#4a2040' }}
    >
      <div className="max-w-4xl mx-auto px-6 py-12">
<Link
          to="/"
          className="inline-flex items-center gap-2 mb-8 text-sm hover:opacity-70 transition-opacity"
          style={{ color: themeColors.colors.pink[400] }}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Portfolio
        </Link>
<div className="flex items-start gap-4 mb-4">
          <span className="text-5xl mt-1">🥽</span>
          <div>
            <h1 className="text-4xl font-bold" style={{ color: heading }}>
              VR/AR Language Link Training
            </h1>
            <p className="text-lg mt-1" style={{ color: muted }}>
              Instructional Design · VR360 · Thinglink · 2024
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {['Insta360', 'Thinglink', 'CapCut', 'Instructional Design', 'Branching Scenario'].map(tag => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(253,213,223,0.12)' : themeColors.colors.pink[50],
                    color: heading,
                    border: `1px solid ${cardBorder}`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
<div className="mt-8 rounded-2xl overflow-hidden" style={{ border: `1px solid ${cardBorder}` }}>
          <img
            src={vr360}
            alt="360° recording session at Language Link Hà Đông"
            className="w-full object-cover"
            style={{ maxHeight: '380px', objectPosition: 'center' }}
          />
          <p className="text-xs text-center py-2" style={{ color: muted }}>
            360° recording session at Language Link Hà Đông office
          </p>
        </div>
<div className="mt-8 rounded-2xl p-6" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
          <h2 className="text-xl font-bold mb-3" style={{ color: heading }}>Problem</h2>
          <p className="text-sm leading-relaxed" style={{ color: body }}>
            Language Link Hà Đông's 10-person sales team struggled with <strong>low consultation conversion rates</strong> due to
            insufficient soft skills training — specifically in customer psychology, persuasion, and objection handling.
            Traditional training lacked realistic practice scenarios and failed to engage learners effectively.
          </p>
        </div>
<div className="mt-8">
          <h2 className="text-xl font-bold mb-2" style={{ color: heading }}>Process</h2>
          <p className="text-sm mb-5" style={{ color: muted }}>Quy trình xây dựng kế hoạch đào tạo — 9 bước</p>
<div className="rounded-2xl overflow-hidden mb-6" style={{ border: `1px solid ${cardBorder}` }}>
            <img
              src={vrProcess}
              alt="9-step training development process"
              className="w-full object-contain bg-white"
              style={{ maxHeight: '320px' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {process.map((p) => (
              <div
                key={p.step}
                className="rounded-xl p-4"
                style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: themeColors.colors.pink[500], color: '#fff' }}
                  >
                    {p.step}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: heading }}>{p.title}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: body }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${cardBorder}` }}>
            <img
              src={vrStudio}
              alt="Insta360 Studio editing interface"
              className="w-full object-cover"
              style={{ maxHeight: '220px', objectPosition: 'center top' }}
            />
            <div className="p-3" style={{ backgroundColor: cardBg }}>
              <p className="text-xs font-semibold" style={{ color: heading }}>Insta360 Studio 2021</p>
              <p className="text-xs mt-1" style={{ color: muted }}>360° stitching, stabilisation & export</p>
            </div>
          </div>
<div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${cardBorder}` }}>
            <div
              className="w-full flex items-center justify-center"
              style={{ height: '220px', backgroundColor: isDarkMode ? 'rgba(255,255,255,0.03)' : '#f7f0f3' }}
            >
              <img
                src={vrApp}
                alt="CapCut app icon — used for video editing"
                style={{ width: '120px', height: '120px', objectFit: 'contain' }}
              />
            </div>
            <div className="p-3" style={{ backgroundColor: cardBg }}>
              <p className="text-xs font-semibold" style={{ color: heading }}>CapCut</p>
              <p className="text-xs mt-1" style={{ color: muted }}>Short-form video editing & module production</p>
            </div>
          </div>
        </div>
<div className="mt-8 rounded-2xl p-6" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: heading }}>Outcomes</h2>
          <div className="space-y-3">
            {outcomes.map((o, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <span className="text-xl shrink-0">{o.emoji}</span>
                <p style={{ color: body }}>{o.text}</p>
              </div>
            ))}
          </div>
        </div>
<div className="mt-8 rounded-2xl p-6" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: heading }}>Stack</h2>
          <div className="space-y-2">
            {stack.map((t, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <span className="font-semibold shrink-0 w-36" style={{ color: heading }}>{t.label}</span>
                <span style={{ color: body }}>{t.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default VRLanguageLink;
