import {
  ArrowLeft,
  BarChart3,
  BookOpenCheck,
  CalendarDays,
  CreditCard,
  Download,
  ExternalLink,
  GraduationCap,
  MessageSquareText,
  MonitorSmartphone,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';

const productFeatures = [
  {
    icon: BookOpenCheck,
    title: 'Lesson reports',
    description: 'Record lesson content, learning attitude, homework, materials and progress in one structured log.',
  },
  {
    icon: GraduationCap,
    title: 'Rubric-based assessment',
    description: 'Evaluate listening, speaking, reading, writing and learning habits with reusable criteria.',
  },
  {
    icon: BarChart3,
    title: 'Learning analytics',
    description: 'Turn assessment records into skill profiles, CEFR-inspired levels and progress charts across cycles.',
  },
  {
    icon: CalendarDays,
    title: 'Shared schedules',
    description: 'Publish fixed lessons, rescheduled sessions, make-up classes and cancellations for each family.',
  },
  {
    icon: CreditCard,
    title: 'Tuition and VietQR',
    description: 'Calculate fees from completed lessons within a configurable billing cycle and generate a payment QR.',
  },
  {
    icon: MessageSquareText,
    title: 'Two-way communication',
    description: 'Send announcements, report notifications and replies while keeping parent feedback in a dedicated inbox.',
  },
  {
    icon: Download,
    title: 'Portable records',
    description: 'Export assessments as CSV or JSON and generate printable lesson reports as PDF.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Installable parent app',
    description: 'Provide mobile-friendly access with a web app manifest, service worker and light/dark themes.',
  },
];

const tutorWorkflow = [
  ['01', 'Open a family workspace', 'Authenticate as a tutor, search by family code and access the linked students.'],
  ['02', 'Capture teaching evidence', 'Write lesson reports, attach learning resources and preserve an edit history when a report changes.'],
  ['03', 'Assess progress', 'Score a detailed rubric, add test results and save comments, advice and the next learning focus.'],
  ['04', 'Coordinate the service', 'Update schedules, calculate tuition, configure payment details and publish announcements.'],
];

const parentWorkflow = [
  ['01', 'Enter with a family code', 'A family-specific login resolves the learners that the parent is authorised to view.'],
  ['02', 'Follow each lesson', 'Parents can review reports, homework links, overall progress and the current weekly schedule.'],
  ['03', 'Understand the bigger picture', 'The analytics view compares skills and shows progress across assessment periods.'],
  ['04', 'Respond and take action', 'Parents can message the tutor, receive updates, view tuition and confirm a bank transfer.'],
];

const decisions = [
  {
    title: 'Two focused interfaces',
    text: 'The tutor needs dense editing and management tools; parents need a calm, read-first experience. Separating the Admin Workspace and Parent App keeps each interface focused on its real job.',
  },
  {
    title: 'Evidence before summaries',
    text: 'Lesson logs and rubric scores are stored first, then transformed into progress views. This makes parent conversations traceable to teaching evidence instead of relying only on memory.',
  },
  {
    title: 'Low-overhead delivery',
    text: 'Vanilla JavaScript modules and static hosting keep deployment simple. Firebase provides authentication and real-time synchronisation without a custom server.',
  },
];

const YuriTutor = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  const pageBg = isDarkMode ? '#101727' : '#fdf6f9';
  const cardBg = isDarkMode ? 'rgba(255,255,255,0.045)' : 'rgba(255,255,255,0.92)';
  const cardBorder = isDarkMode ? 'rgba(253,213,223,0.15)' : themeColors.colors.pink[100];
  const heading = isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[600];
  const body = isDarkMode ? themeColors.colors.dark[200] : themeColors.colors.dark[700];
  const muted = isDarkMode ? themeColors.colors.dark[400] : themeColors.colors.dark[500];

  return (
    <main className="min-h-screen transition-colors duration-300" style={{ backgroundColor: pageBg }}>
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-12">
        <Link to="/" className="inline-flex items-center gap-2 mb-10 text-sm hover:opacity-70 transition-opacity" style={{ color: heading }}>
          <ArrowLeft className="h-4 w-4" /> Back to Portfolio
        </Link>

        <header className="max-w-4xl">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: heading }}>EdTech Product Case Study</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-none" style={{ color: heading }}>Yuri Tutor</h1>
          <p className="text-xl md:text-2xl mt-5 leading-relaxed" style={{ color: body }}>
            A lightweight learning-management toolkit that helps private tutors organise teaching evidence, communicate with parents and run the administrative side of tutoring from one place.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <a href="https://github.com/giangxinh05/yuri-tutor" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105"
              style={{ backgroundColor: themeColors.colors.pink[500], color: '#fff' }}>
              <ExternalLink className="h-4 w-4" /> View source code
            </a>
          </div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
          {[
            [Users, 'Users', 'Tutors & parents'],
            [MonitorSmartphone, 'Product', 'Two connected apps'],
            [ShieldCheck, 'Data', 'Firebase RTDB'],
            [BookOpenCheck, 'Status', 'Working prototype'],
          ].map(([Icon, label, value]) => {
            const StatIcon = Icon as typeof Users;
            return (
              <div key={label as string} className="rounded-xl p-4" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
                <StatIcon className="h-5 w-5 mb-3" style={{ color: heading }} />
                <p className="text-xs uppercase tracking-wider" style={{ color: muted }}>{label as string}</p>
                <p className="text-sm font-semibold mt-1" style={{ color: body }}>{value as string}</p>
              </div>
            );
          })}
        </div>

        <section className="mt-16 grid md:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>The Problem</p>
            <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ color: heading }}>Tutoring becomes fragmented as the student list grows</h2>
          </div>
          <div className="space-y-4 text-sm md:text-base leading-relaxed" style={{ color: body }}>
            <p>Private tutors often manage their work through a mixture of notebooks, spreadsheets, chat messages and separate files. That approach may work for one learner, but it quickly creates repeated work when the tutor has to remember schedules, write post-lesson feedback, calculate tuition and answer the same parent questions.</p>
            <p>Yuri Tutor was built from that practical constraint, especially for people who tutor alongside university or a full-time job. The product does not try to replace the teacher. It reduces the operational work around teaching so that more attention can go into lesson preparation and individual support.</p>
          </div>
        </section>

        <section className="mt-16 rounded-2xl p-6 md:p-8" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
          <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>Product Strategy</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ color: heading }}>One data system, two purpose-built experiences</h2>
          <div className="grid md:grid-cols-2 gap-5 mt-7">
            <div className="rounded-xl p-5" style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.035)' : themeColors.colors.pink[25], border: `1px solid ${cardBorder}` }}>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: heading }}>Admin Workspace</p>
              <h3 className="text-xl font-bold mt-2" style={{ color: body }}>A working console for the tutor</h3>
              <p className="text-sm leading-relaxed mt-3" style={{ color: body }}>Create reports, manage family schedules and tuition, record assessments, review trends and respond to parent messages.</p>
            </div>
            <div className="rounded-xl p-5" style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.035)' : themeColors.colors.pink[25], border: `1px solid ${cardBorder}` }}>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: heading }}>Parent App</p>
              <h3 className="text-xl font-bold mt-2" style={{ color: body }}>A clear window into learning</h3>
              <p className="text-sm leading-relaxed mt-3" style={{ color: body }}>View lesson history, progress, skill analytics, schedules, payment details, announcements and tutor replies.</p>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>Core Experience</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-7" style={{ color: heading }}>Designed around real tutoring tasks</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {productFeatures.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-2xl p-5 flex gap-4" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
                <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center" style={{ backgroundColor: `${themeColors.colors.pink[500]}1f` }}>
                  <Icon className="h-5 w-5" style={{ color: heading }} />
                </div>
                <div>
                  <h3 className="font-bold" style={{ color: heading }}>{title}</h3>
                  <p className="text-sm leading-relaxed mt-1" style={{ color: body }}>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>End-to-End Flow</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ color: heading }}>From a lesson to an informed parent conversation</h2>
          <div className="grid lg:grid-cols-2 gap-6 mt-7">
            <div className="rounded-2xl p-5" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
              <h3 className="text-lg font-bold mb-5" style={{ color: heading }}>Tutor workflow</h3>
              <div className="space-y-5">
                {tutorWorkflow.map(([number, title, text]) => (
                  <div key={number} className="flex gap-4">
                    <span className="text-xs font-bold shrink-0 pt-1" style={{ color: heading }}>{number}</span>
                    <div><p className="font-semibold text-sm" style={{ color: body }}>{title}</p><p className="text-xs leading-relaxed mt-1" style={{ color: muted }}>{text}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-5" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
              <h3 className="text-lg font-bold mb-5" style={{ color: heading }}>Parent workflow</h3>
              <div className="space-y-5">
                {parentWorkflow.map(([number, title, text]) => (
                  <div key={number} className="flex gap-4">
                    <span className="text-xs font-bold shrink-0 pt-1" style={{ color: heading }}>{number}</span>
                    <div><p className="font-semibold text-sm" style={{ color: body }}>{title}</p><p className="text-xs leading-relaxed mt-1" style={{ color: muted }}>{text}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 grid lg:grid-cols-[1.05fr_0.95fr] gap-6">
          <article className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>Assessment Model</p>
            <h2 className="text-3xl font-bold mt-2" style={{ color: heading }}>Turning observations into learning evidence</h2>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: body }}>The tutor scores rubric items from 0–5 across listening, speaking, reading, writing and learning habits. Yuri Tutor converts these observations into percentage scores, combines the four language skills with a monthly test using a 70/30 weighting, and presents a CEFR-inspired summary.</p>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: body }}>The analytics layer then visualises skill profiles and progress over time using native SVG charts. Comments, advice, learning materials and the next focus remain alongside the numbers so the data never loses its instructional context.</p>
          </article>
          <article className="rounded-2xl p-6 md:p-8" style={{ background: `linear-gradient(135deg, ${themeColors.colors.pink[500]}22, ${themeColors.colors.pink[300]}11)`, border: `1px solid ${themeColors.colors.pink[300]}44` }}>
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>Billing Logic</p>
            <h2 className="text-3xl font-bold mt-2" style={{ color: heading }}>Tuition calculated from teaching records</h2>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: body }}>The default billing cycle runs from the 16th of one month to the 15th of the next. Completed lesson dates are counted once per family, multiplied by the configured fee and passed into a VietQR payment image.</p>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: body }}>After transferring, a parent can send a payment confirmation back to the tutor’s inbox for manual verification.</p>
          </article>
        </section>

        <section className="mt-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>Design Decisions</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-7" style={{ color: heading }}>Keeping the system understandable and deployable</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {decisions.map((decision) => (
              <article key={decision.title} className="rounded-2xl p-5" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
                <h3 className="font-bold" style={{ color: heading }}>{decision.title}</h3>
                <p className="text-sm leading-relaxed mt-2" style={{ color: body }}>{decision.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-2xl p-6 md:p-8" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
          <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>Technical Architecture</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ color: heading }}>A static frontend with real-time data</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 text-sm" style={{ color: body }}>
            {[
              ['Frontend', 'HTML5, CSS3 and Vanilla JavaScript ES modules'],
              ['Data', 'Firebase Realtime Database with live subscriptions'],
              ['Access', 'Firebase Authentication and family/student mappings'],
              ['Visualisation', 'Custom SVG radar and line charts'],
              ['Documents', 'CSV, JSON and html2pdf.js exports'],
              ['Delivery', 'Static hosting with PWA app shell caching'],
            ].map(([label, value]) => (
              <div key={label} className="border-l-2 pl-3" style={{ borderColor: heading }}><p className="font-bold" style={{ color: heading }}>{label}</p><p className="text-xs leading-relaxed mt-1" style={{ color: muted }}>{value}</p></div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid md:grid-cols-2 gap-5">
          <article className="rounded-2xl p-6" style={{ background: `linear-gradient(135deg, ${themeColors.colors.pink[500]}22, ${themeColors.colors.pink[300]}11)`, border: `1px solid ${themeColors.colors.pink[300]}44` }}>
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>Outcome</p>
            <h2 className="text-2xl font-bold mt-2" style={{ color: heading }}>A connected prototype for the full tutoring workflow</h2>
            <p className="text-sm leading-relaxed mt-3" style={{ color: body }}>Yuri Tutor demonstrates an end-to-end service rather than an isolated dashboard: tutors create learning evidence and manage operations, while families receive the relevant information through a dedicated portal.</p>
          </article>
          <article className="rounded-2xl p-6" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>Next Iteration</p>
            <h2 className="text-2xl font-bold mt-2" style={{ color: heading }}>Validate usability and strengthen production access</h2>
            <p className="text-sm leading-relaxed mt-3" style={{ color: body }}>The next step is structured testing with tutors and parents, followed by stronger account provisioning, verified payment status, automated tests and production Firebase rules tailored to each deployed environment.</p>
          </article>
        </section>
      </div>
    </main>
  );
};

export default YuriTutor;
