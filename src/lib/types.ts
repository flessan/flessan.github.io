import { Heading } from "./markdown";

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft: boolean;
  featured: boolean;
  image?: string;
  content: string;
  readingTime: number;
  headings: Heading[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  date: string;
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  image?: string;
  content: string;
  headings: Heading[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface CategorizedSkill {
    category: string;
    skills: string[];
}

export interface CvData {
  name: string;
  title: string;
  summary: string;
  email: string;
  phone:string;
  website: string;
  location: string;
  avatar?: string;
  skills: CategorizedSkill[];
  experience: Experience[];
  education: Education[];
}

export interface CodeStatsXP {
  language: string;
  new_xp: number;
  total_xp: number;
}
