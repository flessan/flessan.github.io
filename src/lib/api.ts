import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import slug from 'remark-slug';
import { visit } from 'unist-util-visit';
import type { Root } from 'remark-parse/lib';
import type { BlogPost, Project, TocEntry } from '@/lib/types';


const contentDirectory = path.join(process.cwd(), '_content');

// Custom plugin to extract TOC
const tocPlugin = () => (tree: Root, file: any) => {
  const toc: TocEntry[] = [];
  visit(tree, 'heading', (node) => {
    if (node.depth === 2 || node.depth === 3) { // Only H2 and H3
      const text = node.children.map(child => (child.type === 'text' ? child.value : '')).join('');
      if (node.data && (node.data as any).id) {
          toc.push({
          level: node.depth,
          text: text,
          slug: (node.data as any).id,
        });
      }
    }
  });
  file.data.toc = toc;
};


async function getParsedMarkdown(content: string) {
    const file = await remark()
      .use(slug)
      .use(tocPlugin)
      .use(html, { sanitize: false })
      .process(content);
      
    return {
      content: file.toString(),
      toc: file.data.toc as TocEntry[],
    };
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
    const { content, toc } = await getParsedMarkdown(post.content || '');
    post.content = content;
    post.toc = toc;
    return post;
}


// Project API
export function getAllProjects(): Project[] {
    return getAllItems<Project>('projects');
}

export async function getProjectWithContent(slug: string): Promise<Project> {
    const project = getItemBySlug<Project>('projects', slug);
    const { content, toc } = await getParsedMarkdown(project.content || '');
    project.content = content;
    project.toc = toc;
    return project;
}
