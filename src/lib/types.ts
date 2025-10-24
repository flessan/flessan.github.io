export interface TocEntry {
    level: number;
    text: string;
    slug: string;
  }
  
  export interface Project {
    slug: string;
    title: string;
    description: string;
    image: string;
    detailImage: string;
    content: string;
    toc: TocEntry[];
    technologies?: string[];
    links?: {
      github?: string;
      live?: string;
    };
    [key: string]: any;
  }
  
  export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    image: string;
    content: string;
    toc: TocEntry[];
    [key:string]: any;
  }
  