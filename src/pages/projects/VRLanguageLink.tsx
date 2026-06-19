import { ArrowLeft, CalendarDays, Clock3, Layers3, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import vrApp from '../../assets/vr_ll_app.png';
import vr360 from '../../assets/vr_ll_360.png';
import vrStudio from '../../assets/vr_ll_studio.png';
import vrProcess from '../../assets/vr_ll_process.png';

const researchFindings = [
  {
    title: 'Limited onboarding time',
    text: 'New sales staff had little time to build product knowledge before handling detailed questions from parents.',
  },
  {
    title: 'Gaps in customer conversations',
    text: 'Staff reported difficulty handling objections, negative feedback and customers who were reluctant to share their real needs.',
  },
  {
    title: 'Need for flexible practice',
    text: 'The team wanted realistic case-based learning that could fit around daily sales and customer-service responsibilities.',
  },
];

const curriculum = [
  ['01', 'Customer psychology', 'Discover needs, build trust, communicate clearly and manage emotion.'],
  ['02', 'Persuasion', 'Handle objections, present value, listen actively and negotiate.'],
  ['03', 'Time management', 'Plan work, prioritise leads, reduce distractions and review performance.'],
  ['04', 'Problem solving', 'Analyse issues, develop options, act on feedback and learn from failure.'],
];

const scenarios = [
  'Tuition fees exceed the parent’s budget',
  'The parent compares Language Link with a lower-priced competitor',
  'The available class schedule does not fit the learner',
  'The learner is already enrolled at another centre',
  'The learner is disengaged or the parent is not ready to decide',
];

const process = [
  ['01', 'Field research', 'Interviewed the centre manager and sales team and reviewed the existing training approach.'],
  ['02', 'Needs analysis', 'Mapped performance gaps, work pressures and the situations staff found hardest to handle.'],
  ['03', 'Learning architecture', 'Defined four competency areas and a two-month, 20-video learning path.'],
  ['04', 'Scenario design', 'Turned recurring parent objections into five realistic branching conversations.'],
  ['05', 'Scriptwriting', 'Wrote effective and ineffective response paths with feedback for each decision.'],
  ['06', '360° production', 'Recorded role-play scenes from an immersive learner viewpoint using an Insta360 camera.'],
  ['07', 'Post-production', 'Stitched and edited the footage in Insta360 Studio and a mobile video editor.'],
  ['08', 'Interactive build', 'Published the scenes in ThingLink and added choices, branches and immediate feedback.'],
  ['09', 'Review & handoff', 'Documented the solution, evaluated its limitations and prepared it for organisational use.'],
];

const VRLanguageLink = () => {
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
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: heading }}>Learning Experience Design Case Study</p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight" style={{ color: heading }}>
            Immersive Sales Training for Language Link
          </h1>
          <p className="text-lg md:text-xl mt-5 leading-relaxed" style={{ color: body }}>
            A research-led online training programme that uses branching VR360 scenarios to help education sales staff practise difficult parent conversations in a safe environment.
          </p>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
          {[
            [Users, 'Audience', '10 staff members'],
            [CalendarDays, 'Duration', '2-month programme'],
            [Layers3, 'Curriculum', '4 themes · 20 videos'],
            [Clock3, 'Format', '8–12 min modules'],
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

        <figure className="mt-10 rounded-2xl overflow-hidden" style={{ border: `1px solid ${cardBorder}`, backgroundColor: cardBg }}>
          <img src={vr360} alt="A 360-degree role-play recording at Language Link Ha Dong" className="w-full object-cover" />
          <figcaption className="text-xs px-4 py-3" style={{ color: muted }}>A VR360 role-play scene recorded in the Language Link Hà Đông office.</figcaption>
        </figure>

        <section className="mt-14 grid md:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>The Challenge</p>
            <h2 className="text-3xl font-bold mt-2" style={{ color: heading }}>Make practice realistic without interrupting the workday</h2>
          </div>
          <div className="space-y-4 text-sm md:text-base leading-relaxed" style={{ color: body }}>
            <p>Language Link Hà Đông already combined classroom instruction with role-play, but continuous recruitment and a busy sales schedule limited the time available for structured practice.</p>
            <p>Newer staff were expected to understand several course pathways while responding confidently to pricing concerns, scheduling conflicts, complaints and hesitant parents. The brief was therefore not simply to digitise existing material, but to create repeatable practice that felt close to a real consultation.</p>
          </div>
        </section>

        <section className="mt-14">
          <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>Research</p>
          <h2 className="text-3xl font-bold mt-2 mb-6" style={{ color: heading }}>What the field study revealed</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {researchFindings.map((finding) => (
              <article key={finding.title} className="rounded-2xl p-5" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
                <h3 className="font-bold" style={{ color: heading }}>{finding.title}</h3>
                <p className="text-sm leading-relaxed mt-2" style={{ color: body }}>{finding.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-2xl p-6 md:p-8" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
          <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>My Contribution</p>
          <h2 className="text-3xl font-bold mt-2" style={{ color: heading }}>From needs analysis to an interactive prototype</h2>
          <p className="mt-4 leading-relaxed" style={{ color: body }}>
            Working in a two-person university project team, I contributed across the full learning-design cycle: field research, training-needs analysis, curriculum planning, scenario and dialogue writing, 360° recording, video editing, interactive authoring and final evaluation. The work connected instructional design decisions with a tangible media product rather than stopping at a training proposal.
          </p>
        </section>

        <section className="mt-14">
          <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>Learning Architecture</p>
          <h2 className="text-3xl font-bold mt-2 mb-6" style={{ color: heading }}>Four skills, designed as short practice cycles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {curriculum.map(([number, title, text]) => (
              <article key={number} className="rounded-2xl p-5 flex gap-4" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
                <span className="text-sm font-bold shrink-0" style={{ color: heading }}>{number}</span>
                <div>
                  <h3 className="font-bold" style={{ color: heading }}>{title}</h3>
                  <p className="text-sm mt-1 leading-relaxed" style={{ color: body }}>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>Experience Design</p>
            <h2 className="text-3xl font-bold mt-2" style={{ color: heading }}>Branch, respond, receive feedback</h2>
            <p className="mt-4 leading-relaxed" style={{ color: body }}>
              Each VR scene places the learner inside a parent consultation. At a decision point, the learner chooses between an empathetic, solution-oriented response and a weaker response such as dismissing the concern or pushing for an immediate sale. ThingLink then reveals the consequence and explains how to improve.
            </p>
            <ul className="mt-5 space-y-2 text-sm" style={{ color: body }}>
              {scenarios.map((scenario) => <li key={scenario} className="flex gap-2"><span style={{ color: heading }}>●</span>{scenario}</li>)}
            </ul>
          </div>
          <figure className="rounded-2xl overflow-hidden" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
            <img src={vrApp} alt="Mobile video editing application used in the production workflow" className="w-full object-contain bg-white" />
            <figcaption className="text-xs px-4 py-3" style={{ color: muted }}>Mobile editing supported the short-form training-video workflow.</figcaption>
          </figure>
        </section>

        <section className="mt-14">
          <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>Process</p>
          <h2 className="text-3xl font-bold mt-2 mb-6" style={{ color: heading }}>A nine-step production workflow</h2>
          <figure className="rounded-2xl overflow-hidden mb-6" style={{ backgroundColor: '#fff', border: `1px solid ${cardBorder}` }}>
            <img src={vrProcess} alt="Nine-step Language Link training development process" className="w-full object-contain" />
          </figure>
          <div className="grid md:grid-cols-3 gap-3">
            {process.map(([number, title, text]) => (
              <article key={number} className="rounded-xl p-4" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
                <p className="text-xs font-bold" style={{ color: heading }}>{number}</p>
                <h3 className="font-semibold mt-2" style={{ color: heading }}>{title}</h3>
                <p className="text-xs leading-relaxed mt-2" style={{ color: body }}>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 grid md:grid-cols-2 gap-6 items-center">
          <figure className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: `1px solid ${cardBorder}` }}>
            <img src={vrStudio} alt="Insta360 Studio used for stitching and editing 360-degree footage" className="w-full object-contain" />
          </figure>
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>Toolchain</p>
            <h2 className="text-3xl font-bold mt-2" style={{ color: heading }}>A lightweight immersive-media stack</h2>
            <p className="mt-4 leading-relaxed" style={{ color: body }}>Insta360 hardware captured the scenes, Insta360 Studio handled stitching and export, a mobile editor supported post-production, and ThingLink delivered the branching interactions and learner feedback.</p>
            <div className="flex flex-wrap gap-2 mt-5">
              {['Insta360', '360° video', 'ThingLink', 'Branching scenarios', 'Instructional design'].map((tag) => (
                <span key={tag} className="text-xs px-3 py-1.5 rounded-full" style={{ color: heading, border: `1px solid ${cardBorder}` }}>{tag}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14 grid md:grid-cols-2 gap-5">
          <article className="rounded-2xl p-6" style={{ background: `linear-gradient(135deg, ${themeColors.colors.pink[500]}22, ${themeColors.colors.pink[300]}11)`, border: `1px solid ${themeColors.colors.pink[300]}44` }}>
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>Outcome</p>
            <h2 className="text-2xl font-bold mt-2" style={{ color: heading }}>A complete, reusable training concept</h2>
            <p className="text-sm leading-relaxed mt-3" style={{ color: body }}>The team completed the soft-skills curriculum and an interactive VR360 training prototype. The project was also connected with Unikorm JSC to explore organisational and commercial use.</p>
          </article>
          <article className="rounded-2xl p-6" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>Reflection</p>
            <h2 className="text-2xl font-bold mt-2" style={{ color: heading }}>What I would validate next</h2>
            <p className="text-sm leading-relaxed mt-3" style={{ color: body }}>The field-study window and access to staff were limited, and the first prototype’s interactivity was intentionally simple. A next iteration should pilot with a larger cohort and measure confidence, scenario performance, complaint handling and sales conversion before and after training.</p>
          </article>
        </section>
      </div>
    </main>
  );
};

export default VRLanguageLink;
