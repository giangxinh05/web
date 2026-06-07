import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const DOCS = {
  skills: 'skills',
  experiences: 'experiences',
  projects: 'projects',
  certifications: 'certifications',
  settings: 'settings',
} as const;

export type SkillBar = { category: string; name: string; percent: number };

export type Experience = {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
};

export type ProjectOutcome = { emoji: string; text: string };
export type ProjectProcessStep = { step: string; title: string; desc: string };
export type ProjectTechStack = { label: string; value: string };
export type ProjectFeature = { emoji: string; title: string; desc: string };
export type ProjectImage = { url: string; caption: string };

export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  avatarUrl: string;
  githubUrl: string;
  demoUrl: string;
  emoji: string;
  subtitle: string;
  overview: string;
  problem: string;
  outcomes: ProjectOutcome[];
  processSteps: ProjectProcessStep[];
  techStack: ProjectTechStack[];
  features: ProjectFeature[];
  images: ProjectImage[];
  impactPoints: string[];
};

export type Certification = {
  emoji: string;
  title: string;
  issuer: string;
  period: string;
  description: string;
};

export type PortfolioSettings = {
  summary: string;
  heroDescription: string;
  lastUpdated: string;
};

async function fetchDoc<T>(docId: string): Promise<T | null> {
  try {
    const snap = await getDoc(doc(db, 'portfolio', docId));
    if (!snap.exists()) return null;
    return snap.data() as T;
  } catch (e) {
    console.error(`[firestore] fetchDoc(${docId}) failed:`, e);
    return null;
  }
}

async function saveDoc(docId: string, data: object): Promise<void> {
  await setDoc(doc(db, 'portfolio', docId), data, { merge: true });
}

export async function fetchSkills(): Promise<SkillBar[] | null> {
  const data = await fetchDoc<{ items: SkillBar[] }>(DOCS.skills);
  return data?.items ?? null;
}
export async function saveSkills(items: SkillBar[]): Promise<void> {
  await saveDoc(DOCS.skills, { items });
}

export async function fetchExperiences(): Promise<Experience[] | null> {
  const data = await fetchDoc<{ items: Experience[] }>(DOCS.experiences);
  return data?.items ?? null;
}
export async function saveExperiences(items: Experience[]): Promise<void> {
  await saveDoc(DOCS.experiences, { items });
}

export async function fetchProjects(): Promise<Project[] | null> {
  const data = await fetchDoc<{ items: Project[] }>(DOCS.projects);
  return data?.items ?? null;
}
export async function fetchProjectById(id: string): Promise<Project | null> {
  const projects = await fetchProjects();
  return projects?.find(p => p.id === id) ?? null;
}
export async function saveProjects(items: Project[]): Promise<void> {
  await saveDoc(DOCS.projects, { items });
}

export async function fetchCertifications(): Promise<Certification[] | null> {
  const data = await fetchDoc<{ items: Certification[] }>(DOCS.certifications);
  return data?.items ?? null;
}
export async function saveCertifications(items: Certification[]): Promise<void> {
  await saveDoc(DOCS.certifications, { items });
}

export async function fetchSettings(): Promise<PortfolioSettings | null> {
  return await fetchDoc<PortfolioSettings>(DOCS.settings);
}
export async function saveSettings(data: Partial<PortfolioSettings>): Promise<void> {
  await saveDoc(DOCS.settings, data);
}
