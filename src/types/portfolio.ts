export type ProfileId = "software" | "backend" | "ai" | "solutions" | "cloud";

export type SkillCategoryId =
  | "core"
  | "frontend"
  | "backend"
  | "ai"
  | "cloud"
  | "data"
  | "iot"
  | "tools";

export interface Profile {
  id: ProfileId;
  label: string;
  eyebrow: string;
  headline: string;
  summary: string;
  projectOrder: string[];
  featuredProjectCount: number;
  skillCategoryOrder: SkillCategoryId[];
  featuredSkills: string[];
}

export interface EvidenceItem {
  text: string;
  profiles: ProfileId[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  summary: string;
  highlights: EvidenceItem[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  engineering: string;
  technologies: string[];
  profiles: ProfileId[];
}

export interface SkillCategory {
  id: SkillCategoryId;
  title: string;
  description: string;
  skills: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  detail?: string;
  specialization?: string;
  honors?: string;
  location: string;
  period: string;
}
