
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// The ImagePlaceholder logic is removed. We'll use direct URLs.

export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  detailImage: string;
  content: string;
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
  [key:string]: any;
}

const contentDirectory = path.join(process.cwd(), '_content');

async function getParsedMarkdown(content: string) {
    const { remark } = await import('remark');
    const { default: html } = await import('remark-html');
    const processedContent = await remark().use(html).process(content);
    return processedContent.toString();
}

function getItemBySlug<T extends {slug: string; content: string}>(collection: 'blog' | 'projects', slug: string): T {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(contentDirectory, collection, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const item = {
    ...data,
    slug: realSlug,
    content: content,
  } as T;
  
  return item;
}

function getAllItems<T extends {slug: string; content: string}>(collection: 'blog' | 'projects'): T[] {
  const collectionDir = path.join(contentDirectory, collection);
  if (!fs.existsSync(collectionDir)) {
    return [];
  }
  const slugs = fs.readdirSync(collectionDir).map(file => file.replace(/\.md$/, ''));
  const items = slugs
    .map((slug) => getItemBySlug<T>(collection, slug))
    // sort posts by date in descending order
    .sort((item1: any, item2: any) => (item1.date > item2.date ? -1 : 1));
  return items;
}

// Blog API
export function getAllBlogPosts(): BlogPost[] {
  return getAllItems<BlogPost>('blog');
}

export async function getBlogPostWithContent(slug: string): Promise<BlogPost> {
    const post = getItemBySlug<BlogPost>('blog', slug);
    post.content = await getParsedMarkdown(post.content || '');
    return post;
}


// Project API
export function getAllProjects(): Project[] {
    return getAllItems<Project>('projects');
}

export async function getProjectWithContent(slug: string): Promise<Project> {
    const project = getItemBySlug<Project>('projects', slug);
    project.content = await getParsedMarkdown(project.content || '');
    return project;
}
