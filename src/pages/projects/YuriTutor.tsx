import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const YuriTutor = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  const features = [
    { emoji: '📋', title: 'Lesson Reports', desc: 'Write, edit, and soft-delete lesson reports with full edit history tracking.' },
    { emoji: '🤖', title: 'AI Progress Analysis', desc: 'Claude API-powered automated student progress analysis and parent communication.' },
    { emoji: '💰', title: 'Auto Tuition Billing', desc: 'Automatically calculates tuition per billing cycle (16th–15th monthly).' },
    { emoji: '💬', title: 'Parent Inbox', desc: 'Two-way messaging between teacher and parents, with push notification badges.' },
    { emoji: '📊', title: 'Progress Charts', desc: 'Attitude & progress charts built with vanilla Canvas API — no chart library needed.' },
    { emoji: '📱', title: 'PWA Ready', desc: 'Installable Progressive Web App with offline support via Service Worker.' },
    { emoji: '🏦', title: 'VietQR Payment', desc: 'VietQR payment integration with MB Bank deep link for seamless tuition collection.' },
    { emoji: '📄', title: 'PDF Export', desc: 'Export lesson reports to PDF using html2pdf.js for parent records.' },
  ];

  const techStack = [
    { label: 'Frontend', value: 'Vanilla JS (ES Modules), HTML5, CSS3' },
    { label: 'Backend / DB', value: 'Firebase Realtime Database' },
    { label: 'Auth', value: 'Firebase Authentication (Email/Password)' },
    { label: 'AI', value: 'Anthropic Claude API (claude-sonnet)' },
    { label: 'PWA', value: 'Service Worker + Web App Manifest' },
    { label: 'Charts', value: 'Canvas API (no external library)' },
    { label: 'PDF Export', value: 'html2pdf.js' },
    { label: 'Payment QR', value: 'VietQR API (MB Bank)' },
    { label: 'Hosting', value: 'Netlify' },
  ];

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: isDarkMode ? '#101727' : '#fdf6f9', color: isDarkMode ? '#f3e8ff' : '#4a2040' }}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 mb-8 text-sm hover:opacity-70 transition-opacity" style={{ color: themeColors.colors.pink[400] }}>
          <ArrowLeft className="h-4 w-4" /> Back to Portfolio
        </Link>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">🌸</span>
          <div>
            <h1 className="text-4xl font-bold" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[500] }}>Yuri Tutor</h1>
            <p className="text-lg mt-1" style={{ color: isDarkMode ? themeColors.colors.dark[300] : themeColors.colors.dark[500] }}>PWA for private tutors · No build step · Firebase + AI</p>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <a href="https://github.com/giangxinh05/yuri-tutor" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
            style={{ backgroundColor: themeColors.colors.pink[500], color: '#fff' }}>
            <ExternalLink className="h-4 w-4" /> View on GitHub
          </a>
        </div>
        <div className="mt-10 rounded-2xl p-6" style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.9)', border: `1px solid ${isDarkMode ? 'rgba(253,213,223,0.15)' : themeColors.colors.pink[100]}` }}>
          <h2 className="text-xl font-bold mb-3" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[500] }}>Overview</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: isDarkMode ? themeColors.colors.dark[200] : themeColors.colors.dark[600] }}>
            Yuri Tutor solves a real problem I noticed while working as a private tutor: tutoring is mostly a side job for students or office workers with limited time. Communication between tutors and parents is time-consuming and often manual.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: isDarkMode ? themeColors.colors.dark[200] : themeColors.colors.dark[600] }}>
            This app reduces time spent on administrative and parent interaction tasks by up to <strong>70%</strong> — integrating AI-powered reporting, automated billing, and a two-way messaging inbox. Built with zero framework overhead: pure Vanilla JS with Firebase backend.
          </p>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[500] }}>Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="rounded-xl p-4 flex gap-3" style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.85)', border: `1px solid ${isDarkMode ? 'rgba(253,213,223,0.1)' : themeColors.colors.pink[100]}` }}>
                <span className="text-2xl">{f.emoji}</span>
                <div>
                  <p className="font-semibold text-sm" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[500] }}>{f.title}</p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: isDarkMode ? themeColors.colors.dark[300] : themeColors.colors.dark[600] }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 rounded-2xl p-6" style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.9)', border: `1px solid ${isDarkMode ? 'rgba(253,213,223,0.15)' : themeColors.colors.pink[100]}` }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[500] }}>Tech Stack</h2>
          <div className="space-y-2">
            {techStack.map((t, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <span className="font-medium w-36 flex-shrink-0" style={{ color: isDarkMode ? themeColors.colors.pink[400] : themeColors.colors.pink[500] }}>{t.label}</span>
                <span style={{ color: isDarkMode ? themeColors.colors.dark[200] : themeColors.colors.dark[600] }}>{t.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 rounded-2xl p-6" style={{ background: `linear-gradient(135deg, ${themeColors.colors.pink[500]}22, ${themeColors.colors.pink[300]}11)`, border: `1px solid ${themeColors.colors.pink[300]}44` }}>
          <h2 className="text-xl font-bold mb-3" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[500] }}>Impact</h2>
          <ul className="space-y-2 text-sm" style={{ color: isDarkMode ? themeColors.colors.dark[200] : themeColors.colors.dark[600] }}>
            <li>⏱️ Reduced admin & parent communication time by up to <strong>70%</strong></li>
            <li>📱 Fully installable PWA — works on mobile without App Store</li>
            <li>🔒 Firebase security rules with role-based access control (admin vs parent)</li>
            <li>🌐 Zero server cost — runs entirely on Firebase free tier + Netlify</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default YuriTutor;
