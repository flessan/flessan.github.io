export interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  image: string;
  content: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
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

export interface CvData {
  name: string;
  title: string;
  summary: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
}

export interface CodeStatsXP {
  language: string;
  new_xp: number;
  total_xp: number;
}
