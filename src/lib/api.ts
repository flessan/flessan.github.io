
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import placeholderData from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

const placeholderImages: ImagePlaceholder[] = placeholderData.placeholderImages;

function getImage(id: string): ImagePlaceholder {
  const image = placeholderImages.find((img) => img.id === id);
  if (!image) {
    // Return a default or throw an error
    return {
      id: 'default',
      description: 'Default placeholder image',
      imageUrl: 'https://picsum.photos/seed/default/600/400',
      imageHint: 'placeholder',
    };
  }
  return image;
};

export const aboutMeImage = getImage('about-me');


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

  if ('image' in data && typeof data.image === 'string') {
    (item as any).image = getImage(data.image);
  }
  if ('detailImage' in data && typeof data.detailImage === 'string') {
    (item as any).detailImage = getImage(data.detailImage);
  }
  
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
