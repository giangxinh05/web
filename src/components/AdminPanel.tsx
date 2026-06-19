import { useState, useCallback, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import {
  fetchSkills, saveSkills as fbSaveSkills,
  fetchExperiences, saveExperiences as fbSaveExperiences,
  fetchProjects, saveProjects as fbSaveProjects,
  fetchCertifications, saveCertifications as fbSaveCertifications,
  fetchSettings, saveSettings as fbSaveSettings,
  type SkillBar, type Experience, type Project,
  type Certification, type ProjectOutcome, type ProjectProcessStep,
  type ProjectTechStack, type ProjectFeature, type ProjectImage,
} from '../config/portfolioService';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useThemeColors } from '../hooks/useThemeColors';
import { X, Lock, Plus, Trash2, Save, Edit3, ChevronDown, ChevronUp, LogOut, Loader, Image } from 'lucide-react';

const defaultSkillBars: SkillBar[] = [
  { category: 'Technical', name: 'HTML / CSS', percent: 55 },
  { category: 'Technical', name: 'JavaScript (vanilla ES modules)', percent: 55 },
  { category: 'Technical', name: 'Firebase (RTDB, auth)', percent: 60 },
  { category: 'Technical', name: 'React + TypeScript', percent: 20 },
  { category: 'Technical', name: 'AI Prompt Engineering (Anthropic API)', percent: 70 },
  { category: 'Instructional Design', name: 'Instructional Design', percent: 70 },
  { category: 'Instructional Design', name: 'E-learning Digitization / SCORM', percent: 82 },
  { category: 'Instructional Design', name: 'Moodle LMS Administration', percent: 70 },
  { category: 'Instructional Design', name: 'Script Writing for Educational Content', percent: 90 },
  { category: 'Instructional Design', name: 'Multimedia Production (CapCut)', percent: 70 },
  { category: 'Language', name: 'English', percent: 70 },
  { category: 'Language', name: 'Japanese (N4)', percent: 40 },
  { category: 'Other', name: 'Team Leadership & Event Coordination', percent: 85 },
  { category: 'Other', name: 'Research & Data Analysis (SPSS)', percent: 70 },
];

const defaultExperiences: Experience[] = [
  { title: 'Learning Designer', company: 'Lisburn Academy', location: 'Hanoi, Vietnam', period: 'Aug 2025 - Jan 2026', description: ['Collaborated with the academic department to build an English language program.', 'Created instructional slide decks and detailed Excel tracking roadmaps for a group of 10 students.'] },
  { title: 'Learning Content Developer', company: 'VTV (Vietnam National Television)', location: 'Hanoi, Vietnam', period: 'Feb 2025 - Aug 2025', description: ['Drafted educational broadcast scripts for the VTV7 channel.', 'Collaborated with the production team to develop educational content, contributing to 2 major television programs.'] },
  { title: 'E-learning Developer', company: 'HUSCO - S3 JSC (Vietnam National University)', location: 'Hanoi, Vietnam', period: 'Jun 2024 - Dec 2024', description: ['Produced and edited 2nd-grade science lecture videos using CapCut across 2 academic semesters.', 'Co-organized the "International Drone Coding Competition 2024" with FKA Korea — managing nearly 200 contestants from 4 countries.'] },
  { title: 'Teaching Assistant', company: 'TEKY Academy', location: 'Hanoi, Vietnam', period: 'Jun 2023 - Dec 2023', description: ['Assisted in delivering programming lessons for elementary students.', 'Managed 2 classes with over 40 students.'] },
  { title: 'Learning Experience Design Intern', company: 'Edulive Global Joint Stock Company', location: 'Hanoi, Vietnam', period: 'Jun 2022 - Sep 2022', description: ['Digitized educational materials by converting approximately 3 presentations per day into interactive e-learning modules.', 'Optimized lesson interactivity by integrating multimedia elements.'] },
];

const defaultProjects: Project[] = [
  { id: 'yuri-tutor', title: 'Yuri Tutor 🌸', description: 'A connected toolkit for private tutors and parents, combining lesson reports, rubric-based analytics, schedules, tuition management and real-time communication.', technologies: ['Vanilla JS', 'Firebase RTDB', 'Learning Analytics', 'PWA', 'VietQR'], avatarUrl: '', githubUrl: 'https://github.com/giangxinh05/yuri-tutor', demoUrl: '', emoji: '🌸', subtitle: 'EdTech toolkit for private tutors and families', overview: 'Yuri Tutor brings teaching records, learning analytics, schedules, tuition and parent communication into one lightweight system.', problem: 'Private tutors often manage growing student workloads through disconnected notebooks, spreadsheets, files and chat messages.', outcomes: [{ emoji: '📚', text: 'Connected tutor and parent workflows through two focused web applications.' }, { emoji: '📊', text: 'Turned rubric assessments into CEFR-inspired summaries and progress visualisations.' }], processSteps: [], techStack: [{ label: 'Frontend', value: 'Vanilla JavaScript ES Modules, HTML5, CSS3' }, { label: 'Data & Auth', value: 'Firebase Realtime Database and Firebase Authentication' }, { label: 'Delivery', value: 'PWA service worker and static hosting' }], features: [{ emoji: '📋', title: 'Lesson Reports', desc: 'Create and edit structured lesson records with revision history.' }, { emoji: '📊', title: 'Learning Analytics', desc: 'Visualise rubric scores, skill profiles and progress across assessment cycles.' }], images: [], impactPoints: ['📱 Installable parent-facing PWA', '💳 Automated cycle-based tuition totals with VietQR'] },
  { id: 'vr-language-link', title: 'Immersive Sales Training for Language Link', description: 'Research-led online training for education sales staff, combining a four-part soft-skills curriculum with branching VR360 customer scenarios.', technologies: ['Learning Experience Design', 'VR360', 'ThingLink', 'Branching Scenarios'], avatarUrl: '', githubUrl: '', demoUrl: '', emoji: '🥽', subtitle: 'Learning Experience Design · VR360 · ThingLink · 2024', overview: 'A two-month online programme designed from field research with the Language Link Hà Đông team.', problem: 'Busy schedules and limited onboarding time left newer sales staff with too few opportunities to practise difficult parent conversations.', outcomes: [{ emoji: '🎯', text: 'Designed five branching VR360 scenarios based on recurring parent objections.' }, { emoji: '📚', text: 'Built a four-theme curriculum comprising 20 short-form training videos.' }], processSteps: [{ step: '01', title: 'Field research', desc: 'Conducted needs analysis through surveys and interviews with staff and management.' }, { step: '02', title: 'Learning design', desc: 'Mapped four capability gaps and translated them into a structured learning path.' }], techStack: [{ label: 'Capture', value: 'Insta360 camera' }, { label: 'Editing', value: 'Insta360 Studio and mobile video editing' }, { label: 'Publishing', value: 'ThingLink branching interactions' }], features: [], images: [], impactPoints: [] },
  { id: 'emotion-robot', title: 'EMORO Emotion Monitoring Robot', description: 'An international gPBL prototype combining an IoT robot, edge computing and YOLOv7-based facial-emotion estimation for classroom scenarios.', technologies: ['IoT Robotics', 'YOLOv7', 'Edge Computing', 'International gPBL'], avatarUrl: '', githubUrl: '', demoUrl: 'https://youtu.be/GNY7fwvFQQM?si=POJMe5yib7BouZDi', emoji: '🤖', subtitle: 'International gPBL · IoT Robotics · 2023', overview: 'A mobile IoRT prototype exploring facial emotion as an additional signal for classroom engagement.', problem: 'Teachers cannot continuously observe every learner reaction while delivering a lesson to a large class.', outcomes: [{ emoji: '🧠', text: 'Labelled 400 participant expressions across seven emotion classes.' }, { emoji: '⚡', text: 'Demonstrated edge inference at approximately 2–3 FPS on a 2014 MacBook Air.' }], processSteps: [], techStack: [{ label: 'Robot', value: 'OSOYOO V2.1, Arduino UNO, ultrasonic sensor, Wi-Fi shield' }, { label: 'Vision', value: 'YOLOv7-tiny and Label Studio' }, { label: 'Networking', value: 'RTSP streaming, JSON output and APNS endpoint design' }], features: [], images: [], impactPoints: [] },
];

const defaultCertifications: Certification[] = [
  { emoji: '🏆', title: 'Outstanding Officer Award', issuer: 'Faculty of Educational Technology, HUST', period: '2021 - 2022', description: 'Awarded by the Dean for outstanding leadership in school-level STEM initiatives and scientific research activities.' },
  { emoji: '🌏', title: 'gPBL International Program', issuer: 'Shibaura Institute of Technology, Japan', period: '2023', description: 'Led a multidisciplinary international student team in Global Project-Based Learning program.' },
  { emoji: '🤖', title: 'AI Prompt Engineering', issuer: 'Anthropic Claude API Integration', period: '2024', description: 'Self-developed AI-powered tools integrating Claude API for educational use cases.' },
  { emoji: '📺', title: 'VTV7 Educational Content', issuer: 'Vietnam National Television', period: '2025', description: 'Contributed to 2 major television educational programs on VTV7.' },
];

type Tab = 'about' | 'skills' | 'experience' | 'projects' | 'certifications' | 'settings';

const AdminPanel = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('about');
  const [saveMsg, setSaveMsg] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  const [summary, setSummary] = useState('EdTech & learning experience design professional at HUST. I build AI-powered education tools, interactive e-learning, and digital training solutions that bridge learners and knowledge. Currently exploring the intersection of instructional design and generative AI. 🎓✨');
  const [heroDescription, setHeroDescription] = useState('');
  const [lastUpdated, setLastUpdated] = useState('10/12/2025');
  const [skillBars, setSkillBars] = useState<SkillBar[]>(defaultSkillBars);
  const [experiences, setExperiences] = useState<Experience[]>(defaultExperiences);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [certifications, setCertifications] = useState<Certification[]>(defaultCertifications);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [activeProjectDetail, setActiveProjectDetail] = useState<number | null>(null);

  const loadFromFirestore = useCallback(async () => {
    setLoading(true);
    try {
      const [skills, exps, projs, certs, settings] = await Promise.all([
        fetchSkills(), fetchExperiences(), fetchProjects(), fetchCertifications(), fetchSettings(),
      ]);
      if (skills) setSkillBars(skills);
      if (exps) setExperiences(exps);
      if (projs) setProjects(projs);
      if (certs) setCertifications(certs);
      if (settings) {
        if (settings.summary) setSummary(settings.summary);
        if (settings.heroDescription) setHeroDescription(settings.heroDescription);
        if (settings.lastUpdated) setLastUpdated(settings.lastUpdated);
      }
    } catch (e) { console.error('loadFromFirestore:', e); }
    setLoading(false);
  }, []);

  const handleLogin = async () => {
    setLoginLoading(true); setLoginError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      await loadFromFirestore();
    } catch { setLoginError('Email hoặc mật khẩu không đúng'); }
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsAuthenticated(false); setEmail(''); setPassword(''); setIsOpen(false);
  };

  const flash = (msg: string) => { setSaveMsg(msg); setTimeout(() => setSaveMsg(''), 2500); };
  const withSave = async (fn: () => Promise<void>, msg: string) => {
    setSaving(true);
    try { await fn(); window.dispatchEvent(new Event('portfolio_admin_update')); flash(msg); }
    catch (e) { flash('❌ Lỗi — kiểm tra console'); console.error(e); }
    setSaving(false);
  };

  const saveAbout = () => withSave(async () => { await fbSaveSettings({ summary, heroDescription }); }, 'About đã lưu ✓');
  const saveSkillsH = () => withSave(async () => { await fbSaveSkills(skillBars); }, 'Skills đã lưu ✓');
  const saveExperiencesH = () => withSave(async () => { await fbSaveExperiences(experiences); }, 'Experience đã lưu ✓');
  const saveProjectsH = () => withSave(async () => { await fbSaveProjects(projects); }, 'Projects đã lưu ✓');
  const saveCertificationsH = () => withSave(async () => { await fbSaveCertifications(certifications); }, 'Certifications đã lưu ✓');
  const saveSettingsH = () => withSave(async () => { await fbSaveSettings({ lastUpdated }); }, 'Settings đã lưu ✓');

  const updateSkill = useCallback((i: number, field: keyof SkillBar, value: string | number) => {
    setSkillBars(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: field === 'percent' ? Number(value) : value } : s));
  }, []);

  const updateExp = (i: number, field: keyof Experience, value: string | string[]) =>
    setExperiences(prev => prev.map((e, idx) => idx === i ? { ...e, [field]: value } : e));

  const updateCert = (i: number, field: keyof Certification, value: string) =>
    setCertifications(prev => prev.map((c, idx) => idx === i ? { ...c, [field]: value } : c));

  const updateProject = (i: number, field: keyof Project, value: unknown) =>
    setProjects(prev => prev.map((p, idx) => idx === i ? { ...p, [field]: value } : p));

  const updateOutcome = (pi: number, oi: number, field: keyof ProjectOutcome, value: string) =>
    setProjects(prev => prev.map((p, idx) => idx === pi ? { ...p, outcomes: p.outcomes.map((o, j) => j === oi ? { ...o, [field]: value } : o) } : p));
  const addOutcome = (pi: number) =>
    setProjects(prev => prev.map((p, idx) => idx === pi ? { ...p, outcomes: [...p.outcomes, { emoji: '✅', text: '' }] } : p));
  const removeOutcome = (pi: number, oi: number) =>
    setProjects(prev => prev.map((p, idx) => idx === pi ? { ...p, outcomes: p.outcomes.filter((_, j) => j !== oi) } : p));

  const updateStep = (pi: number, si: number, field: keyof ProjectProcessStep, value: string) =>
    setProjects(prev => prev.map((p, idx) => idx === pi ? { ...p, processSteps: p.processSteps.map((s, j) => j === si ? { ...s, [field]: value } : s) } : p));
  const addStep = (pi: number) =>
    setProjects(prev => prev.map((p, idx) => idx === pi ? { ...p, processSteps: [...p.processSteps, { step: String(p.processSteps.length + 1).padStart(2, '0'), title: '', desc: '' }] } : p));
  const removeStep = (pi: number, si: number) =>
    setProjects(prev => prev.map((p, idx) => idx === pi ? { ...p, processSteps: p.processSteps.filter((_, j) => j !== si) } : p));

  const updateTech = (pi: number, ti: number, field: keyof ProjectTechStack, value: string) =>
    setProjects(prev => prev.map((p, idx) => idx === pi ? { ...p, techStack: p.techStack.map((t, j) => j === ti ? { ...t, [field]: value } : t) } : p));
  const addTech = (pi: number) =>
    setProjects(prev => prev.map((p, idx) => idx === pi ? { ...p, techStack: [...p.techStack, { label: '', value: '' }] } : p));
  const removeTech = (pi: number, ti: number) =>
    setProjects(prev => prev.map((p, idx) => idx === pi ? { ...p, techStack: p.techStack.filter((_, j) => j !== ti) } : p));

  const updateFeature = (pi: number, fi: number, field: keyof ProjectFeature, value: string) =>
    setProjects(prev => prev.map((p, idx) => idx === pi ? { ...p, features: p.features.map((f, j) => j === fi ? { ...f, [field]: value } : f) } : p));
  const addFeature = (pi: number) =>
    setProjects(prev => prev.map((p, idx) => idx === pi ? { ...p, features: [...p.features, { emoji: '✨', title: '', desc: '' }] } : p));
  const removeFeature = (pi: number, fi: number) =>
    setProjects(prev => prev.map((p, idx) => idx === pi ? { ...p, features: p.features.filter((_, j) => j !== fi) } : p));

  const updateImage = (pi: number, ii: number, field: keyof ProjectImage, value: string) =>
    setProjects(prev => prev.map((p, idx) => idx === pi ? { ...p, images: p.images.map((img, j) => j === ii ? { ...img, [field]: value } : img) } : p));
  const addImage = (pi: number) =>
    setProjects(prev => prev.map((p, idx) => idx === pi ? { ...p, images: [...p.images, { url: '', caption: '' }] } : p));
  const removeImage = (pi: number, ii: number) =>
    setProjects(prev => prev.map((p, idx) => idx === pi ? { ...p, images: p.images.filter((_, j) => j !== ii) } : p));

  const updateImpact = (pi: number, ii: number, value: string) =>
    setProjects(prev => prev.map((p, idx) => idx === pi ? { ...p, impactPoints: p.impactPoints.map((pt, j) => j === ii ? value : pt) } : p));
  const addImpact = (pi: number) =>
    setProjects(prev => prev.map((p, idx) => idx === pi ? { ...p, impactPoints: [...p.impactPoints, ''] } : p));
  const removeImpact = (pi: number, ii: number) =>
    setProjects(prev => prev.map((p, idx) => idx === pi ? { ...p, impactPoints: p.impactPoints.filter((_, j) => j !== ii) } : p));

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user && isOpen && !isAuthenticated) { setIsAuthenticated(true); loadFromFirestore(); }
    });
    return unsubscribe;
  }, [isOpen, isAuthenticated, loadFromFirestore]);

  const panelBg = isDarkMode ? '#0f172a' : '#fff';
  const borderColor = isDarkMode ? 'rgba(253,213,223,0.15)' : 'rgba(200,139,149,0.25)';
  const textColor = isDarkMode ? '#e2e8f0' : '#3d2b2b';
  const inputBg = isDarkMode ? '#1e293b' : '#fff5f7';
  const inputBorder = isDarkMode ? 'rgba(253,213,223,0.2)' : 'rgba(200,139,149,0.3)';
  const tabInactive = isDarkMode ? '#475569' : '#d1a0aa';
  const sectionBg = isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(249,168,212,0.05)';

  const inp: React.CSSProperties = { width: '100%', padding: '7px 10px', borderRadius: '7px', border: `1px solid ${inputBorder}`, background: inputBg, color: textColor, fontSize: '12px', outline: 'none' };
  const btnP: React.CSSProperties = { background: themeColors.colors.pink[500], color: '#fff', border: 'none', borderRadius: '8px', padding: '7px 16px', fontSize: '12px', cursor: saving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600, opacity: saving ? 0.7 : 1 };
  const btnD: React.CSSProperties = { background: '#ef4444', color: '#fff', border: 'none', borderRadius: '5px', padding: '3px 8px', fontSize: '11px', cursor: 'pointer', flexShrink: 0 };
  const btnS: React.CSSProperties = { background: isDarkMode ? 'rgba(253,213,223,0.08)' : 'rgba(200,139,149,0.08)', color: textColor, border: `1px solid ${inputBorder}`, borderRadius: '7px', padding: '5px 12px', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' };
  const subHead: React.CSSProperties = { color: themeColors.colors.pink[400], fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '12px 0 6px' };
  const card: React.CSSProperties = { border: `1px solid ${borderColor}`, borderRadius: '10px', overflow: 'hidden', marginBottom: '10px' };
  const cardHead: React.CSSProperties = { padding: '9px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: sectionBg };
  const cardBody: React.CSSProperties = { padding: '12px', display: 'flex', flexDirection: 'column', gap: '7px' };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Awards' },
    { id: 'settings', label: '⚙' },
  ];

  const toggle = (key: string) => setCollapsed(p => ({ ...p, [key]: !p[key] }));

  return (
    <>
      <button onClick={() => setIsOpen(true)} aria-label="Open admin panel"
        style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9000, background: themeColors.colors.pink[500], color: '#fff', border: 'none', borderRadius: '50%', width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(200,139,149,0.5)', cursor: 'pointer', transition: 'transform 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}>
        <Edit3 size={22} />
      </button>

      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9100, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
          onClick={e => { if (e.target === e.currentTarget) setIsOpen(false); }}>
          <div style={{ background: panelBg, border: `1px solid ${borderColor}`, borderRadius: '16px', width: '100%', maxWidth: '720px', maxHeight: '92vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 80px rgba(0,0,0,0.4)' }}>
<div style={{ padding: '16px 20px', borderBottom: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <Lock size={16} style={{ color: themeColors.colors.pink[400] }} />
                <span style={{ fontWeight: 700, color: textColor, fontSize: '15px' }}>Admin Panel 🌸</span>
              </div>
              <div style={{ display: 'flex', gap: '7px', alignItems: 'center' }}>
                {isAuthenticated && <button onClick={handleLogout} style={btnS}><LogOut size={13} /> Đăng xuất</button>}
                <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: textColor }}><X size={18} /></button>
              </div>
            </div>

            {!isAuthenticated ? (
              <div style={{ padding: '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <Lock size={36} style={{ color: themeColors.colors.pink[400] }} />
                <p style={{ color: textColor, fontSize: '14px', fontWeight: 600 }}>Đăng nhập Admin</p>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={{ ...inp, maxWidth: '300px', fontSize: '13px', padding: '9px 12px' }} autoFocus />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="Mật khẩu" style={{ ...inp, maxWidth: '300px', fontSize: '13px', padding: '9px 12px' }} />
                {loginError && <p style={{ color: '#ef4444', fontSize: '12px' }}>{loginError}</p>}
                <button onClick={handleLogin} style={{ ...btnP, padding: '9px 20px', fontSize: '13px' }} disabled={loginLoading}>
                  {loginLoading ? <Loader size={13} style={{ animation: 'spin 1s linear infinite' }} /> : <Lock size={13} />}
                  {loginLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>
              </div>
            ) : loading ? (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: textColor }}>
                <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />
                <span style={{ fontSize: '13px' }}>Đang tải dữ liệu...</span>
              </div>
            ) : (
              <>
<div style={{ display: 'flex', gap: '3px', padding: '10px 20px 0', flexShrink: 0, overflowX: 'auto' }}>
                  {tabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                      style={{ background: activeTab === tab.id ? themeColors.colors.pink[500] : 'transparent', color: activeTab === tab.id ? '#fff' : tabInactive, border: `1px solid ${activeTab === tab.id ? themeColors.colors.pink[500] : inputBorder}`, borderRadius: '7px 7px 0 0', padding: '5px 13px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                      {tab.label}
                    </button>
                  ))}
                </div>
<div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
{activeTab === 'about' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <p style={subHead}>Summary (quyển vở)</p>
                      <textarea value={summary} onChange={e => setSummary(e.target.value)} rows={5} style={{ ...inp, resize: 'vertical', lineHeight: '1.6', fontSize: '12px' }} />
                      <p style={subHead}>Hero Description (dưới typewriter)</p>
                      <p style={{ color: tabInactive, fontSize: '11px' }}>Hiện tại phần này được render qua TypewriterCarousel. Nếu muốn thêm dòng mô tả tĩnh dưới typewriter, nhập vào đây.</p>
                      <textarea value={heroDescription} onChange={e => setHeroDescription(e.target.value)} rows={3} style={{ ...inp, resize: 'vertical' }} placeholder="vd: Building EdTech tools from Hanoi 🇻🇳" />
                      <button onClick={saveAbout} style={btnP} disabled={saving}><Save size={13} /> Lưu About</button>
                    </div>
                  )}
{activeTab === 'skills' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <p style={subHead}>Skill Bars</p>
                      {skillBars.map((skill, i) => (
                        <div key={i} style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                          <select value={skill.category} onChange={e => updateSkill(i, 'category', e.target.value)} style={{ ...inp, width: '140px', flex: '0 0 140px' }}>
                            {['Technical', 'Instructional Design', 'Language', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                          <input value={skill.name} onChange={e => updateSkill(i, 'name', e.target.value)} placeholder="Tên skill" style={{ ...inp, flex: 1, minWidth: '100px' }} />
                          <input type="number" min={0} max={100} value={skill.percent} onChange={e => updateSkill(i, 'percent', e.target.value)} style={{ ...inp, width: '55px', flex: '0 0 55px' }} />
                          <span style={{ color: themeColors.colors.pink[500], fontSize: '11px', width: '30px' }}>{skill.percent}%</span>
                          <button onClick={() => setSkillBars(prev => prev.filter((_, idx) => idx !== i))} style={btnD}><Trash2 size={11} /></button>
                        </div>
                      ))}
                      <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', marginTop: '4px' }}>
                        <button onClick={() => setSkillBars(prev => [...prev, { category: 'Technical', name: '', percent: 50 }])} style={btnS}><Plus size={13} /> Thêm</button>
                        <button onClick={saveSkillsH} style={btnP} disabled={saving}><Save size={13} /> Lưu Skills</button>
                      </div>
                    </div>
                  )}
{activeTab === 'experience' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                      <p style={subHead}>Work Experience</p>
                      {experiences.map((exp, i) => (
                        <div key={i} style={card}>
                          <div style={cardHead} onClick={() => toggle(`exp-${i}`)}>
                            <span style={{ color: textColor, fontSize: '12px', fontWeight: 600 }}>{exp.title || `Experience #${i + 1}`} — {exp.company}</span>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                              <button onClick={e => { e.stopPropagation(); setExperiences(prev => prev.filter((_, idx) => idx !== i)); }} style={btnD}><Trash2 size={11} /></button>
                              {collapsed[`exp-${i}`] ? <ChevronDown size={14} style={{ color: textColor }} /> : <ChevronUp size={14} style={{ color: textColor }} />}
                            </div>
                          </div>
                          {!collapsed[`exp-${i}`] && (
                            <div style={cardBody}>
                              <input value={exp.title} onChange={e => updateExp(i, 'title', e.target.value)} placeholder="Job Title" style={inp} />
                              <input value={exp.company} onChange={e => updateExp(i, 'company', e.target.value)} placeholder="Company" style={inp} />
                              <div style={{ display: 'flex', gap: '6px' }}>
                                <input value={exp.location} onChange={e => updateExp(i, 'location', e.target.value)} placeholder="Location" style={{ ...inp, flex: 1 }} />
                                <input value={exp.period} onChange={e => updateExp(i, 'period', e.target.value)} placeholder="Period" style={{ ...inp, flex: 1 }} />
                              </div>
                              <p style={{ ...subHead, margin: '6px 0 3px' }}>Mô tả (mỗi dòng = 1 bullet)</p>
                              <textarea value={exp.description.join('\n')} onChange={e => updateExp(i, 'description', e.target.value.split('\n'))} rows={4} style={{ ...inp, resize: 'vertical' }} />
                            </div>
                          )}
                        </div>
                      ))}
                      <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', marginTop: '4px' }}>
                        <button onClick={() => setExperiences(prev => [...prev, { title: '', company: '', location: 'Hanoi, Vietnam', period: '', description: [''] }])} style={btnS}><Plus size={13} /> Thêm</button>
                        <button onClick={saveExperiencesH} style={btnP} disabled={saving}><Save size={13} /> Lưu</button>
                      </div>
                    </div>
                  )}
{activeTab === 'projects' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                      <p style={subHead}>Projects</p>
                      {projects.map((proj, i) => (
                        <div key={i} style={card}>
<div style={cardHead} onClick={() => toggle(`proj-${i}`)}>
                            <span style={{ color: textColor, fontSize: '12px', fontWeight: 600 }}>{proj.emoji} {proj.title || `Project #${i + 1}`}</span>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                              <button onClick={e => { e.stopPropagation(); setProjects(prev => prev.filter((_, idx) => idx !== i)); }} style={btnD}><Trash2 size={11} /></button>
                              {collapsed[`proj-${i}`] ? <ChevronDown size={14} style={{ color: textColor }} /> : <ChevronUp size={14} style={{ color: textColor }} />}
                            </div>
                          </div>
                          {!collapsed[`proj-${i}`] && (
                            <div style={cardBody}>
<p style={subHead}>📋 Card (trang chủ)</p>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                <input value={proj.emoji} onChange={e => updateProject(i, 'emoji', e.target.value)} placeholder="Emoji" style={{ ...inp, width: '60px', flex: '0 0 60px' }} />
                                <input value={proj.id} onChange={e => updateProject(i, 'id', e.target.value)} placeholder="id (slug)" style={{ ...inp, flex: 1 }} />
                              </div>
                              <input value={proj.title} onChange={e => updateProject(i, 'title', e.target.value)} placeholder="Tên project" style={inp} />
                              <textarea value={proj.description} onChange={e => updateProject(i, 'description', e.target.value)} rows={2} style={{ ...inp, resize: 'vertical' }} placeholder="Mô tả ngắn (card)" />
                              <input value={proj.technologies.join(', ')} onChange={e => updateProject(i, 'technologies', e.target.value.split(',').map(t => t.trim()).filter(Boolean))} placeholder="Tags (cách nhau dấu phẩy)" style={inp} />
                              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                <Image size={13} style={{ color: tabInactive, flexShrink: 0 }} />
                                <input value={proj.avatarUrl} onChange={e => updateProject(i, 'avatarUrl', e.target.value)} placeholder="Avatar URL (Cloudinary)" style={{ ...inp, flex: 1 }} />
                              </div>
                              <input value={proj.githubUrl} onChange={e => updateProject(i, 'githubUrl', e.target.value)} placeholder="GitHub URL" style={inp} />
                              <input value={proj.demoUrl} onChange={e => updateProject(i, 'demoUrl', e.target.value)} placeholder="Demo/YouTube URL" style={inp} />
<div style={{ border: `1px solid ${inputBorder}`, borderRadius: '8px', marginTop: '6px', overflow: 'hidden' }}>
                                <div style={{ ...cardHead, background: isDarkMode ? 'rgba(253,213,223,0.05)' : 'rgba(249,168,212,0.08)' }}
                                  onClick={() => setActiveProjectDetail(activeProjectDetail === i ? null : i)}>
                                  <span style={{ color: themeColors.colors.pink[400], fontSize: '11px', fontWeight: 700 }}>📄 Detail Page Content</span>
                                  {activeProjectDetail === i ? <ChevronUp size={13} style={{ color: tabInactive }} /> : <ChevronDown size={13} style={{ color: tabInactive }} />}
                                </div>
                                {activeProjectDetail === i && (
                                  <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <input value={proj.subtitle} onChange={e => updateProject(i, 'subtitle', e.target.value)} placeholder="Subtitle (vd: PWA · Firebase · 2024)" style={inp} />
                                    <textarea value={proj.overview} onChange={e => updateProject(i, 'overview', e.target.value)} rows={3} style={{ ...inp, resize: 'vertical' }} placeholder="Overview paragraph" />
                                    <textarea value={proj.problem} onChange={e => updateProject(i, 'problem', e.target.value)} rows={2} style={{ ...inp, resize: 'vertical' }} placeholder="Problem paragraph" />
<p style={subHead}>🖼 Images (Cloudinary URLs)</p>
                                    <p style={{ color: tabInactive, fontSize: '10px' }}>Ảnh 1 = hero, ảnh 2 = process diagram, ảnh 3+ = gallery</p>
                                    {proj.images.map((img, ii) => (
                                      <div key={ii} style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                        <input value={img.url} onChange={e => updateImage(i, ii, 'url', e.target.value)} placeholder="Image URL" style={{ ...inp, flex: 2 }} />
                                        <input value={img.caption} onChange={e => updateImage(i, ii, 'caption', e.target.value)} placeholder="Caption" style={{ ...inp, flex: 1 }} />
                                        <button onClick={() => removeImage(i, ii)} style={btnD}><Trash2 size={11} /></button>
                                      </div>
                                    ))}
                                    <button onClick={() => addImage(i)} style={btnS}><Plus size={12} /> Thêm ảnh</button>
<p style={subHead}>✨ Features (app-type)</p>
                                    {proj.features.map((f, fi) => (
                                      <div key={fi} style={{ display: 'flex', gap: '5px', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <input value={f.emoji} onChange={e => updateFeature(i, fi, 'emoji', e.target.value)} placeholder="🔧" style={{ ...inp, width: '45px', flex: '0 0 45px' }} />
                                        <input value={f.title} onChange={e => updateFeature(i, fi, 'title', e.target.value)} placeholder="Tên feature" style={{ ...inp, flex: 1 }} />
                                        <input value={f.desc} onChange={e => updateFeature(i, fi, 'desc', e.target.value)} placeholder="Mô tả" style={{ ...inp, flex: 2 }} />
                                        <button onClick={() => removeFeature(i, fi)} style={btnD}><Trash2 size={11} /></button>
                                      </div>
                                    ))}
                                    <button onClick={() => addFeature(i)} style={btnS}><Plus size={12} /> Thêm feature</button>
<p style={subHead}>🔢 Process Steps</p>
                                    {proj.processSteps.map((s, si) => (
                                      <div key={si} style={{ display: 'flex', gap: '5px', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <input value={s.step} onChange={e => updateStep(i, si, 'step', e.target.value)} placeholder="01" style={{ ...inp, width: '40px', flex: '0 0 40px' }} />
                                        <input value={s.title} onChange={e => updateStep(i, si, 'title', e.target.value)} placeholder="Tên bước" style={{ ...inp, flex: 1 }} />
                                        <input value={s.desc} onChange={e => updateStep(i, si, 'desc', e.target.value)} placeholder="Mô tả" style={{ ...inp, flex: 2 }} />
                                        <button onClick={() => removeStep(i, si)} style={btnD}><Trash2 size={11} /></button>
                                      </div>
                                    ))}
                                    <button onClick={() => addStep(i)} style={btnS}><Plus size={12} /> Thêm bước</button>
<p style={subHead}>🎯 Outcomes</p>
                                    {proj.outcomes.map((o, oi) => (
                                      <div key={oi} style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                        <input value={o.emoji} onChange={e => updateOutcome(i, oi, 'emoji', e.target.value)} placeholder="🎯" style={{ ...inp, width: '45px', flex: '0 0 45px' }} />
                                        <input value={o.text} onChange={e => updateOutcome(i, oi, 'text', e.target.value)} placeholder="Outcome text" style={{ ...inp, flex: 1 }} />
                                        <button onClick={() => removeOutcome(i, oi)} style={btnD}><Trash2 size={11} /></button>
                                      </div>
                                    ))}
                                    <button onClick={() => addOutcome(i)} style={btnS}><Plus size={12} /> Thêm outcome</button>
<p style={subHead}>🛠 Tech Stack</p>
                                    {proj.techStack.map((t, ti) => (
                                      <div key={ti} style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                        <input value={t.label} onChange={e => updateTech(i, ti, 'label', e.target.value)} placeholder="Label" style={{ ...inp, flex: 1 }} />
                                        <input value={t.value} onChange={e => updateTech(i, ti, 'value', e.target.value)} placeholder="Value" style={{ ...inp, flex: 2 }} />
                                        <button onClick={() => removeTech(i, ti)} style={btnD}><Trash2 size={11} /></button>
                                      </div>
                                    ))}
                                    <button onClick={() => addTech(i)} style={btnS}><Plus size={12} /> Thêm stack</button>
<p style={subHead}>💥 Impact Points</p>
                                    {proj.impactPoints.map((pt, ii) => (
                                      <div key={ii} style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                        <input value={pt} onChange={e => updateImpact(i, ii, e.target.value)} placeholder="⏱️ Reduced time by 70%" style={{ ...inp, flex: 1 }} />
                                        <button onClick={() => removeImpact(i, ii)} style={btnD}><Trash2 size={11} /></button>
                                      </div>
                                    ))}
                                    <button onClick={() => addImpact(i)} style={btnS}><Plus size={12} /> Thêm impact</button>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', marginTop: '4px' }}>
                        <button onClick={() => setProjects(prev => [...prev, { id: `project-${prev.length + 1}`, title: '', description: '', technologies: [], avatarUrl: '', githubUrl: '', demoUrl: '', emoji: '📁', subtitle: '', overview: '', problem: '', outcomes: [], processSteps: [], techStack: [], features: [], images: [], impactPoints: [] }])} style={btnS}><Plus size={13} /> Thêm project</button>
                        <button onClick={saveProjectsH} style={btnP} disabled={saving}><Save size={13} /> Lưu tất cả</button>
                      </div>
                    </div>
                  )}
{activeTab === 'certifications' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                      <p style={subHead}>Achievements & Awards</p>
                      {certifications.map((cert, i) => (
                        <div key={i} style={card}>
                          <div style={cardHead} onClick={() => toggle(`cert-${i}`)}>
                            <span style={{ color: textColor, fontSize: '12px', fontWeight: 600 }}>{cert.emoji} {cert.title || `Award #${i + 1}`}</span>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                              <button onClick={e => { e.stopPropagation(); setCertifications(prev => prev.filter((_, idx) => idx !== i)); }} style={btnD}><Trash2 size={11} /></button>
                              {collapsed[`cert-${i}`] ? <ChevronDown size={14} style={{ color: textColor }} /> : <ChevronUp size={14} style={{ color: textColor }} />}
                            </div>
                          </div>
                          {!collapsed[`cert-${i}`] && (
                            <div style={cardBody}>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                <input value={cert.emoji} onChange={e => updateCert(i, 'emoji', e.target.value)} placeholder="🏆" style={{ ...inp, width: '50px', flex: '0 0 50px' }} />
                                <input value={cert.title} onChange={e => updateCert(i, 'title', e.target.value)} placeholder="Tên giải thưởng" style={{ ...inp, flex: 1 }} />
                              </div>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                <input value={cert.issuer} onChange={e => updateCert(i, 'issuer', e.target.value)} placeholder="Đơn vị cấp" style={{ ...inp, flex: 2 }} />
                                <input value={cert.period} onChange={e => updateCert(i, 'period', e.target.value)} placeholder="Năm" style={{ ...inp, flex: 1 }} />
                              </div>
                              <textarea value={cert.description} onChange={e => updateCert(i, 'description', e.target.value)} rows={2} style={{ ...inp, resize: 'vertical' }} placeholder="Mô tả" />
                            </div>
                          )}
                        </div>
                      ))}
                      <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', marginTop: '4px' }}>
                        <button onClick={() => setCertifications(prev => [...prev, { emoji: '🏆', title: '', issuer: '', period: '', description: '' }])} style={btnS}><Plus size={13} /> Thêm</button>
                        <button onClick={saveCertificationsH} style={btnP} disabled={saving}><Save size={13} /> Lưu</button>
                      </div>
                    </div>
                  )}
{activeTab === 'settings' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <p style={subHead}>Last Updated (footer)</p>
                      <div style={{ display: 'flex', gap: '7px', alignItems: 'center' }}>
                        <input value={lastUpdated} onChange={e => setLastUpdated(e.target.value)} placeholder="vd: 06/06/2026" style={{ ...inp, flex: 1 }} />
                        <button onClick={saveSettingsH} style={btnP} disabled={saving}><Save size={13} /> Lưu</button>
                      </div>
                      <p style={{ color: tabInactive, fontSize: '11px' }}>Preview: <strong style={{ color: textColor }}>Last updated: {lastUpdated}</strong></p>
                    </div>
                  )}
                </div>
{saveMsg && (
                  <div style={{ margin: '0 20px 14px', padding: '9px 14px', background: saveMsg.startsWith('❌') ? 'rgba(239,68,68,0.1)' : isDarkMode ? 'rgba(134,239,172,0.15)' : 'rgba(22,163,74,0.1)', border: `1px solid ${saveMsg.startsWith('❌') ? 'rgba(239,68,68,0.3)' : isDarkMode ? 'rgba(134,239,172,0.3)' : 'rgba(22,163,74,0.3)'}`, borderRadius: '8px', color: saveMsg.startsWith('❌') ? '#ef4444' : isDarkMode ? '#86efac' : '#15803d', fontSize: '12px', fontWeight: 600, textAlign: 'center', flexShrink: 0 }}>
                    {saveMsg}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </>
  );
};

export default AdminPanel;
