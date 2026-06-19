import { ArrowLeft, BrainCircuit, Camera, Cpu, ExternalLink, Radio, Users, Wifi } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import prototypeImage from '../../assets/emoro-prototype.png';
import datasetImage from '../../assets/emoro-dataset.png';
import architectureImage from '../../assets/emoro-architecture.png';
import linkProtectionImage from '../../assets/emoro-link-protection.png';

const systemLayers = [
  { icon: Camera, title: 'Mobile sensing', text: 'A smartphone mounted at classroom height captured facial images while the robot moved through the space.' },
  { icon: Wifi, title: 'IoT mobility', text: 'An Arduino-based OSOYOO robot used Wi-Fi control and an ultrasonic sensor for obstacle detection.' },
  { icon: Cpu, title: 'Edge inference', text: 'An RTSP client passed the camera stream to a local YOLOv7 emotion-recognition pipeline.' },
  { icon: Radio, title: 'Feedback delivery', text: 'Predictions were formatted as JSON and designed to reach a reminder endpoint through APNS.' },
];

const process = [
  ['01', 'Discover', 'Explored education challenges including limited visibility into learner engagement and teaching quality.'],
  ['02', 'Define', 'Focused the project on recognising classroom emotion as a possible feedback signal for teachers and schools.'],
  ['03', 'Prototype mobility', 'Assembled the robot, integrated the Arduino UNO, motor driver, Wi-Fi shield and ultrasonic sensor.'],
  ['04', 'Build the dataset', 'Set up Label Studio on a local network and labelled 400 participant expressions across seven classes.'],
  ['05', 'Run edge inference', 'Tested YOLOv7-tiny and a stronger pretrained model for multi-angle facial emotion estimation.'],
  ['06', 'Connect the system', 'Streamed camera frames over RTSP, produced JSON output and designed a cached read/write recovery flow.'],
];

const EmotionTrackingRobot = () => {
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
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: heading }}>International gPBL · IoT Robotics · 2023</p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight" style={{ color: heading }}>EMORO: Real-Time Emotion Monitoring Robot</h1>
          <p className="text-lg md:text-xl mt-5 leading-relaxed" style={{ color: body }}>
            A mobile IoRT prototype that combines classroom sensing, edge computing and facial-emotion estimation to explore a new source of feedback on learner engagement.
          </p>
          <a href="https://youtu.be/GNY7fwvFQQM?si=POJMe5yib7BouZDi" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-7 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105"
            style={{ backgroundColor: themeColors.colors.pink[500], color: '#fff' }}>
            <ExternalLink className="h-4 w-4" /> Watch demonstration
          </a>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
          {[
            [Users, 'Programme', 'International gPBL'],
            [BrainCircuit, 'Model', 'YOLOv7-tiny'],
            [Camera, 'Dataset', '400 expressions'],
            [Cpu, 'Edge test', '2–3 FPS'],
          ].map(([Icon, label, value]) => {
            const StatIcon = Icon as typeof Users;
            return <div key={label as string} className="rounded-xl p-4" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
              <StatIcon className="h-5 w-5 mb-3" style={{ color: heading }} />
              <p className="text-xs uppercase tracking-wider" style={{ color: muted }}>{label as string}</p>
              <p className="text-sm font-semibold mt-1" style={{ color: body }}>{value as string}</p>
            </div>;
          })}
        </div>

        <figure className="mt-10 rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: `1px solid ${cardBorder}` }}>
          <img src={prototypeImage} alt="EMORO prototype with a smartphone camera mounted above the robot" className="w-full object-contain" />
          <figcaption className="px-4 py-3 text-xs" style={{ color: muted }}>The prototype used a raised smartphone camera and front counterweights to capture faces at classroom height.</figcaption>
        </figure>

        <section className="mt-16 grid md:grid-cols-[0.9fr_1.1fr] gap-8">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>The Challenge</p>
            <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ color: heading }}>Engagement is difficult to observe at classroom scale</h2>
          </div>
          <div className="space-y-4 leading-relaxed" style={{ color: body }}>
            <p>Teachers can notice individual reactions, but continuously observing a large group while delivering a lesson is difficult. Our international team explored whether facial emotion could become an additional signal for understanding attention and the classroom experience.</p>
            <p>The goal was not to grade students or replace teacher judgement. It was to test the technical feasibility of a mobile device that could capture classroom images, run emotion estimation locally and return structured feedback.</p>
          </div>
        </section>

        <section className="mt-16 rounded-2xl p-6 md:p-8" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
          <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>My Role</p>
          <h2 className="text-3xl font-bold mt-2" style={{ color: heading }}>Collaborating across disciplines and cultures</h2>
          <p className="mt-4 leading-relaxed" style={{ color: body }}>I worked in an international, multidisciplinary gPBL team spanning the education problem, robotic assembly and the emotion-recognition pipeline. My contribution centred on connecting the classroom use case with the system concept, coordinating team work and communicating the final solution as one coherent prototype.</p>
        </section>

        <section className="mt-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>System Design</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-7" style={{ color: heading }}>Four layers from classroom capture to feedback</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {systemLayers.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl p-5 flex gap-4" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
              <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center" style={{ backgroundColor: `${themeColors.colors.pink[500]}1f` }}><Icon className="h-5 w-5" style={{ color: heading }} /></div>
              <div><h3 className="font-bold" style={{ color: heading }}>{title}</h3><p className="text-sm leading-relaxed mt-1" style={{ color: body }}>{text}</p></div>
            </article>)}
          </div>
        </section>

        <section className="mt-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>Development Process</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-7" style={{ color: heading }}>From an education problem to a working demonstration</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {process.map(([number, title, text]) => <article key={number} className="rounded-2xl p-5" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
              <p className="text-xs font-bold" style={{ color: heading }}>{number}</p><h3 className="font-bold mt-2" style={{ color: heading }}>{title}</h3><p className="text-sm leading-relaxed mt-2" style={{ color: body }}>{text}</p>
            </article>)}
          </div>
        </section>

        <section className="mt-16 grid lg:grid-cols-2 gap-6 items-center">
          <figure className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: `1px solid ${cardBorder}` }}><img src={datasetImage} alt="Participant images used for the seven-class facial expression dataset" className="w-full object-contain" /></figure>
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>Model & Data</p>
            <h2 className="text-3xl font-bold mt-2" style={{ color: heading }}>Seven emotion classes labelled from gPBL participants</h2>
            <p className="mt-4 leading-relaxed" style={{ color: body }}>The team hosted Label Studio on a local network and classified 400 facial expressions as happy, sad, neutral, disgust, surprise, fear or angry. This produced a small project-specific dataset for the YOLOv7-tiny experiment.</p>
            <p className="mt-3 leading-relaxed" style={{ color: body }}>For a stronger demonstration across varied face angles, we also tested a pretrained model. On a 2014 MacBook Air with an Intel i5-4260U and 4 GB RAM, inference reached approximately 2–3 frames per second.</p>
          </div>
        </section>

        <section className="mt-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>Edge Architecture</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-7" style={{ color: heading }}>Process locally, send structured results</h2>
          <figure className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: `1px solid ${cardBorder}` }}><img src={architectureImage} alt="EMORO edge-computing architecture using RTSP, YOLOv7 and JSON output" className="w-full object-contain" /></figure>
          <p className="max-w-3xl mt-5 leading-relaxed" style={{ color: body }}>The camera acts as an RTSP server. An edge device reads the stream, runs YOLOv7 inference, formats the result as JSON and forwards it to a reminder endpoint. Keeping inference at the edge reduced the need to upload raw classroom video to a remote service.</p>
        </section>

        <section className="mt-16 grid lg:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>Resilience</p>
            <h2 className="text-3xl font-bold mt-2" style={{ color: heading }}>Designed beyond a single point-to-point demo</h2>
            <p className="mt-4 leading-relaxed" style={{ color: body }}>The proposed link supports multiple cameras and terminal devices. A cached read/write flow introduces a wait state when a stream fails, helping prevent null-pointer failures when a device in the graph goes offline.</p>
          </div>
          <figure className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#fff', border: `1px solid ${cardBorder}` }}><img src={linkProtectionImage} alt="Cached stream processing and link protection workflow" className="w-full object-contain" /></figure>
        </section>

        <section className="mt-16 grid md:grid-cols-2 gap-5">
          <article className="rounded-2xl p-6" style={{ background: `linear-gradient(135deg, ${themeColors.colors.pink[500]}22, ${themeColors.colors.pink[300]}11)`, border: `1px solid ${themeColors.colors.pink[300]}44` }}>
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>Outcome</p>
            <h2 className="text-2xl font-bold mt-2" style={{ color: heading }}>An end-to-end feasibility prototype</h2>
            <p className="text-sm leading-relaxed mt-3" style={{ color: body }}>EMORO connected robotic movement, live image capture, edge inference and structured output in a demonstrable system developed during the international programme.</p>
          </article>
          <article className="rounded-2xl p-6" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: heading }}>Responsible Next Step</p>
            <h2 className="text-2xl font-bold mt-2" style={{ color: heading }}>Validate usefulness, consent and model quality</h2>
            <p className="text-sm leading-relaxed mt-3" style={{ color: body }}>A classroom deployment would require explicit consent, privacy safeguards, bias testing and careful validation of whether facial emotion is a reliable learning signal. The prototype demonstrates technical feasibility, not a finished evaluation system.</p>
          </article>
        </section>
      </div>
    </main>
  );
};

export default EmotionTrackingRobot;
