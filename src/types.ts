export type ProjectCategory = 'all' | 'ai-ml' | 'fullstack' | 'systems';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'ai-ml' | 'fullstack' | 'systems';
  description: string;
  longDescription: string;
  features: string[];
  technologies: string[];
  architecture: {
    frontend?: string;
    backend: string;
    aiModelOrVector?: string;
    database: string;
    deployment: string;
  };
  metrics?: {
    label: string;
    value: string;
  }[];
  githubUrl?: string;
  liveDemoUrl?: string;
  previewImage?: string;
  featured: boolean;
  status: 'Production' | 'Live Beta' | 'Open Source' | 'Completed';
  nodePosition?: [number, number, number]; // for 3D constellation
}

export type SkillCategory = 'ai-ml' | 'development' | 'database-infra' | 'cloud-ai-infra';

export interface Skill {
  name: string;
  category: SkillCategory;
  level: number; // 0-100
  proficiency: 'Mastery' | 'Advanced' | 'Proficient';
  icon: string;
  description: string;
  relatedProjects: string[];
  tags: string[];
}

export interface TimelineItem {
  id: string;
  year: string;
  period: string;
  title: string;
  role: string;
  organization?: string;
  category: 'Education' | 'AI / ML' | 'Engineering' | 'Entrepreneurship';
  description: string;
  highlights: string[];
  skills: string[];
  current?: boolean;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  subtext: string;
  icon: string;
  highlightColor: 'cyan' | 'blue' | 'purple' | 'emerald';
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
