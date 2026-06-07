import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  fetchSkills, fetchExperiences, fetchProjects,
  fetchCertifications, fetchSettings,
  type SkillBar, type Experience, type Project,
  type Certification, type PortfolioSettings,
} from '../config/portfolioService';

interface PortfolioData {
  skills: SkillBar[] | null;
  experiences: Experience[] | null;
  projects: Project[] | null;
  certifications: Certification[] | null;
  settings: PortfolioSettings | null;
}

interface PortfolioContextType {
  data: PortfolioData;
  loading: boolean;
  refresh: () => Promise<void>;
}

const emptyData: PortfolioData = {
  skills: null,
  experiences: null,
  projects: null,
  certifications: null,
  settings: null,
};

let memCache: PortfolioData | null = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(memCache ?? emptyData);
  const [loading, setLoading] = useState(memCache === null);
  const fetchedRef = useRef(false);

  const fetchAll = useCallback(async (force = false) => {
    if (!force && memCache && Date.now() - cacheTime < CACHE_TTL) {
      setData(memCache);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [skills, experiences, projects, certifications, settings] = await Promise.all([
        fetchSkills(),
        fetchExperiences(),
        fetchProjects(),
        fetchCertifications(),
        fetchSettings(),
      ]);

      const fresh: PortfolioData = { skills, experiences, projects, certifications, settings };
      memCache = fresh;
      cacheTime = Date.now();
      setData(fresh);
    } catch (e) {
      console.error('[PortfolioContext] fetch failed:', e);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    const onUpdate = () => fetchAll(true);
    window.addEventListener('portfolio_admin_update', onUpdate);
    return () => window.removeEventListener('portfolio_admin_update', onUpdate);
  }, [fetchAll]);

  return (
    <PortfolioContext.Provider value={{ data, loading, refresh: () => fetchAll(true) }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
};
