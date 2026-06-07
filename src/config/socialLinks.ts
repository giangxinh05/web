export const socialLinks = {
  github: import.meta.env.VITE_GITHUB_URL,
  linkedin: import.meta.env.VITE_LINKEDIN_URL,
  email: import.meta.env.VITE_EMAIL,
  
  repositories: {
    projectOne: import.meta.env.VITE_GITHUB_PROJECT1_URL,
    projectTwo: import.meta.env.VITE_GITHUB_PROJECT2_URL,
    projectThree: import.meta.env.VITE_GITHUB_PROJECT3_URL,
    projectFour: import.meta.env.VITE_GITHUB_PROJECT4_URL,
  },
  
  display: {
    github: import.meta.env.VITE_GITHUB_URL?.replace('https://', ''),
    linkedin: import.meta.env.VITE_LINKEDIN_URL?.replace('https://', ''),
    email: import.meta.env.VITE_EMAIL,
  }
};

export default socialLinks;