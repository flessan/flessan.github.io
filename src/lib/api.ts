import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { getImage } from './data';
import type { ImagePlaceholder } from './placeholder-images';

export interface Project {
  slug: string;
  title: string;
  description: string;
  image: ImagePlaceholder;
  detailImage: ImagePlaceholder;
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
  image: ImagePlaceholder;
  content: string;
  [key: string]: any;
}

const contentDirectory = path.join(process.cwd(), '_content');

async function getParsedMarkdown(content: string) {
    const processedContent = await remark().use(html).process(content);
    return processedContent.toString();
}


function getAllItems<T>(collection: 'blog' | 'projects', fields: (keyof T)[] = []): T[] {
  const collectionDir = path.join(contentDirectory, collection);
  if (!fs.existsSync(collectionDir)) {
    return [];
  }
  const slugs = fs.readdirSync(collectionDir).map(file => file.replace(/\.md$/, ''));
  const items = slugs
    .map((slug) => getItemBySlug<T>(collection, slug, fields))
    .sort((item1: any, item2: any) => (item1.date > item2.date ? -1 : 1));
  return items;
}


function getItemBySlug<T>(collection: 'blog' | 'projects', slug: string, fields: (keyof T)[] = []): T {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(contentDirectory, collection, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items: Partial<T> = {};

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug as any;
    }
    if (field === 'content') {
      items[field] = content as any;
    }
    if (typeof data[field as string] !== 'undefined') {
      items[field] = data[field as string] as any;
    }
  });

  if (collection === 'projects') {
    const projectData = data as any;
    return {
        slug: realSlug,
        title: projectData.title,
        description: projectData.description,
        image: getImage(projectData.image),
        detailImage: getImage(projectData.detailImage),
        content: content,
        links: projectData.links,
        ...items
    } as T;
  }

  if (collection === 'blog') {
      const blogData = data as any;
      return {
        slug: realSlug,
        title: blogData.title,
        excerpt: blogData.excerpt,
        date: blogData.date,
        image: getImage(blogData.image),
        content: content,
        ...items
      } as T;
  }
  
  return data as T;
}

// Blog API
export function getBlogPostBySlug(slug: string): BlogPost {
  return getItemBySlug<BlogPost>('blog', slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return getAllItems<BlogPost>('blog', ['title', 'date', 'slug', 'excerpt', 'image']);
}

export async function getBlogPostWithContent(slug: string): Promise<BlogPost> {
    const post = getBlogPostBySlug(slug);
    post.content = await getParsedMarkdown(post.content || '');
    return post;
}


// Project API
export function getProjectBySlug(slug: string): Project {
    return getItemBySlug<Project>('projects', slug);
}

export function getAllProjects(): Project[] {
    return getAllItems<Project>('projects', ['title', 'slug', 'description', 'image']);
}

export async function getProjectWithContent(slug: string): Promise<Project> {
    const project = getProjectBySlug(slug);
    project.content = await getParsedMarkdown(project.content || '');
    return project;
}

