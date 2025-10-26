import fs from 'fs';
import path from 'path';
import type { Post, Project, CvData } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import matter from 'gray-matter';
import { markdownToHtml } from './markdown';

const contentDirectory = path.join(process.cwd(), 'src', 'content');

function calculateReadingTime(content: string) {
    const wordsPerMinute = 200;
    const noOfWords = content.split(/\s/g).length;
    const minutes = noOfWords / wordsPerMinute;
    return Math.ceil(minutes);
}

export async function getSortedPosts(): Promise<Post[]> {
  const postsDirectory = path.join(contentDirectory, 'blog');
  if (!fs.existsSync(postsDirectory)) return [];

  const filenames = fs.readdirSync(postsDirectory);

  const allPostsData = await Promise.all(filenames
    .filter(filename => filename.endsWith('.md'))
    .map(async (filename) => {
        const slug = filename.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const htmlContent = await markdownToHtml(content);

        const imagePlaceholder = PlaceHolderImages.find(img => img.id === data.image);
        const imageUrl = imagePlaceholder ? imagePlaceholder.imageUrl : '';

        return {
            slug,
            content: htmlContent,
            readingTime: calculateReadingTime(content),
            image: imageUrl,
            ...(data as { title: string; description: string; date: string; tags: string[]; draft: boolean; featured: boolean; }),
        } as Post;
    }));

  return allPostsData
    .filter(post => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
    const postsDirectory = path.join(contentDirectory, 'blog');
    const filePath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        return undefined;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const htmlContent = await markdownToHtml(content);
    
    const imagePlaceholder = PlaceHolderImages.find(img => img.id === data.image);
    const imageUrl = imagePlaceholder ? imagePlaceholder.imageUrl : '';

    return {
        slug,
        content: htmlContent,
        readingTime: calculateReadingTime(content),
        image: imageUrl,
        ...(data as { title: string; description: string; date: string; tags: string[]; draft: boolean; featured: boolean; }),
    } as Post;
}

export async function getSortedProjects(): Promise<Project[]> {
  const projectsDirectory = path.join(contentDirectory, 'projects');
  if (!fs.existsSync(projectsDirectory)) return [];

  const filenames = fs.readdirSync(projectsDirectory);

  const projects = await Promise.all(filenames
    .filter(filename => filename.endsWith('.md'))
    .map(async (filename) => {
        const slug = filename.replace(/\.md$/, '');
        const fullPath = path.join(projectsDirectory, filename);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const htmlContent = await markdownToHtml(content);

        const imagePlaceholder = PlaceHolderImages.find(img => img.id === data.image);
        const imageUrl = imagePlaceholder ? imagePlaceholder.imageUrl : '';

        return {
            slug,
            content: htmlContent,
            image: imageUrl,
            ...(data as { title: string; description: string; date: string; technologies: string[]; liveUrl?: string; repoUrl?: string; featured: boolean; }),
        } as Project;
    }));

    return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
    const projectsDirectory = path.join(contentDirectory, 'projects');
    const filePath = path.join(projectsDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        return undefined;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const htmlContent = await markdownToHtml(content);
    
    const imagePlaceholder = PlaceHolderImages.find(img => img.id === data.image);
    const imageUrl = imagePlaceholder ? imagePlaceholder.imageUrl : '';

    return {
        slug,
        content: htmlContent,
        image: imageUrl,
        ...(data as { title: string; description: string; date: string; technologies: string[]; liveUrl?: string; repoUrl?: string; featured: boolean; }),
    } as Project;
}

export function getCVData(): CvData {
    const filePath = path.join(contentDirectory, 'cv.md');
    if (!fs.existsSync(filePath)) {
        return {
            name: "Your Name",
            title: "Your Title",
            email: "you@example.com",
            phone: "123-456-7890",
            website: "your.site",
            location: "Your City",
            summary: "",
            skills: [],
            experience: [],
            education: [],
        };
    }
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const avatarPlaceholder = PlaceHolderImages.find(img => img.id === data.avatar);
    if (avatarPlaceholder) {
        data.avatar = avatarPlaceholder.imageUrl;
    }

    // A simplified parser for the CV markdown body
    const sections = content.split('## ').slice(1);
    const parsedContent: any = {};

    sections.forEach(section => {
        const lines = section.split('\n');
        const title = lines[0].trim().toLowerCase();
        const body = lines.slice(1).join('\n').trim();

        if (title === 'summary') {
            parsedContent.summary = body;
        } else if (title === 'skills') {
            parsedContent.skills = body.split(',').map(s => s.trim());
        } else if (title === 'experience') {
            const expItems = body.split('### ').slice(1);
            parsedContent.experience = expItems.map(item => {
                const itemLines = item.split('\n');
                const role = itemLines[0].trim();
                const expData: any = { role };
                itemLines.slice(1).forEach(line => {
                    const match = line.match(/\*\*(.*?):\*\*\s*(.*)/);
                    if (match) {
                        const key = match[1].toLowerCase().trim();
                        const value = match[2].trim();
                        expData[key] = value;
                    } else {
                        expData.description = (expData.description || '') + line.replace('- ', '').trim() + '\n';
                    }
                });
                expData.description = expData.description?.trim();
                return expData;
            });
        } else if (title === 'education') {
            const eduItems = body.split('### ').slice(1);
            parsedContent.education = eduItems.map(item => {
                const itemLines = item.split('\n');
                const degree = itemLines[0].trim();
                const eduData: any = { degree };
                itemLines.slice(1).forEach(line => {
                    const match = line.match(/\*\*(.*?):\*\*\s*(.*)/);
                    if (match) {
                        const key = match[1].toLowerCase().trim();
                        const value = match[2].trim();
                        eduData[key] = value;
                    }
                });
                return eduData;
            });
        }
    });

    return { ...data, ...parsedContent } as CvData;
}
