import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Code, Youtube } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { fetchProjectById, type Project } from '../../config/portfolioService';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) return;
    fetchProjectById(id).then(p => {
      setProject(p);
      setLoading(false);
    });
  }, [id]);

  const cardBg = isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.9)';
  const cardBorder = isDarkMode ? 'rgba(253,213,223,0.15)' : themeColors.colors.pink[100];
  const heading = isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[500];
  const body = isDarkMode ? themeColors.colors.dark[200] : themeColors.colors.dark[600];
  const muted = isDarkMode ? themeColors.colors.dark[300] : themeColors.colors.dark[500];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDarkMode ? '#101727' : '#fdf6f9' }}>
        <p style={{ color: muted }}>Loading...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ backgroundColor: isDarkMode ? '#101727' : '#fdf6f9' }}>
        <p style={{ color: heading, fontSize: '2rem' }}>404</p>
        <p style={{ color: muted }}>Project not found</p>
        <Link to="/" style={{ color: themeColors.colors.pink[400] }}>← Back to Portfolio</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: isDarkMode ? '#101727' : '#fdf6f9' }}>
      <div className="max-w-4xl mx-auto px-6 py-12">
<Link to="/" className="inline-flex items-center gap-2 mb-8 text-sm hover:opacity-70 transition-opacity" style={{ color: themeColors.colors.pink[400] }}>
          <ArrowLeft className="h-4 w-4" /> Back to Portfolio
        </Link>
<div className="flex items-start gap-4 mb-4">
          {project.avatarUrl
            ? <img src={project.avatarUrl} alt={project.title} className="w-16 h-16 rounded-2xl object-cover mt-1" />
            : <span className="text-5xl mt-1">{project.emoji || '📁'}</span>
          }
          <div className="flex-1">
            <h1 className="text-4xl font-bold" style={{ color: heading }}>{project.title}</h1>
            {project.subtitle && <p className="text-lg mt-1" style={{ color: muted }}>{project.subtitle}</p>}
            <div className="flex flex-wrap gap-2 mt-3">
              {project.technologies.map(tag => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{ backgroundColor: isDarkMode ? 'rgba(253,213,223,0.12)' : themeColors.colors.pink[50], color: heading, border: `1px solid ${cardBorder}` }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
<div className="flex gap-3 mt-4 flex-wrap">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
              style={{ backgroundColor: themeColors.colors.pink[500], color: '#fff' }}>
              <Code className="h-4 w-4" /> View on GitHub
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
              style={{ backgroundColor: 'transparent', color: '#ef4444', border: '1px solid #ef4444' }}>
              <Youtube className="h-4 w-4" /> Watch Demo
            </a>
          )}
        </div>
{project.images?.[0] && (
          <div className="mt-8 rounded-2xl overflow-hidden" style={{ border: `1px solid ${cardBorder}` }}>
            <img src={project.images[0].url} alt={project.images[0].caption} className="w-full object-cover" style={{ maxHeight: '380px', objectPosition: 'center' }} />
            {project.images[0].caption && (
              <p className="text-xs text-center py-2" style={{ color: muted }}>{project.images[0].caption}</p>
            )}
          </div>
        )}
{project.overview && (
          <div className="mt-8 rounded-2xl p-6" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: heading }}>Overview</h2>
            <p className="text-sm leading-relaxed" style={{ color: body }}>{project.overview}</p>
          </div>
        )}
{project.problem && (
          <div className="mt-6 rounded-2xl p-6" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: heading }}>Problem</h2>
            <p className="text-sm leading-relaxed" style={{ color: body }}>{project.problem}</p>
          </div>
        )}
{project.features?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4" style={{ color: heading }}>Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((f, i) => (
                <div key={i} className="rounded-xl p-4 flex gap-3"
                  style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
                  <span className="text-2xl">{f.emoji}</span>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: heading }}>{f.title}</p>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: body }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
{project.processSteps?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4" style={{ color: heading }}>Process</h2>
{project.images?.[1] && (
              <div className="rounded-2xl overflow-hidden mb-6" style={{ border: `1px solid ${cardBorder}` }}>
                <img src={project.images[1].url} alt={project.images[1].caption} className="w-full object-contain bg-white" style={{ maxHeight: '320px' }} />
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {project.processSteps.map((p) => (
                <div key={p.step} className="rounded-xl p-4" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: themeColors.colors.pink[500], color: '#fff' }}>{p.step}</span>
                    <span className="text-sm font-semibold" style={{ color: heading }}>{p.title}</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: body }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
{project.images?.length > 2 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.slice(2).map((img, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${cardBorder}` }}>
                <img src={img.url} alt={img.caption} className="w-full object-cover" style={{ maxHeight: '220px', objectPosition: 'center top' }} />
                {img.caption && (
                  <div className="p-3" style={{ backgroundColor: cardBg }}>
                    <p className="text-xs" style={{ color: muted }}>{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
{project.outcomes?.length > 0 && (
          <div className="mt-8 rounded-2xl p-6" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: heading }}>Outcomes</h2>
            <div className="space-y-3">
              {project.outcomes.map((o, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="text-xl shrink-0">{o.emoji}</span>
                  <p style={{ color: body }}>{o.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
{project.impactPoints?.length > 0 && (
          <div className="mt-6 rounded-2xl p-6" style={{ background: `linear-gradient(135deg, ${themeColors.colors.pink[500]}22, ${themeColors.colors.pink[300]}11)`, border: `1px solid ${themeColors.colors.pink[300]}44` }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: heading }}>Impact</h2>
            <ul className="space-y-2 text-sm" style={{ color: body }}>
              {project.impactPoints.map((pt, i) => <li key={i}>{pt}</li>)}
            </ul>
          </div>
        )}
{project.techStack?.length > 0 && (
          <div className="mt-8 rounded-2xl p-6" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: heading }}>Stack</h2>
            <div className="space-y-2">
              {project.techStack.map((t, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="font-semibold shrink-0 w-36" style={{ color: heading }}>{t.label}</span>
                  <span style={{ color: body }}>{t.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProjectDetail;
