import fs from 'fs';
import path from 'path';
import type { Post, Project, CvData, Experience, Education } from '@/lib/types';
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
        const { html, headings } = await markdownToHtml(content);

        return {
            slug,
            content: html,
            headings,
            readingTime: calculateReadingTime(content),
            ...(data as { title: string; description: string; date: string; tags: string[]; draft: boolean; featured: boolean; image?: string }),
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
    const { html, headings } = await markdownToHtml(content);
    
    return {
        slug,
        content: html,
        headings,
        readingTime: calculateReadingTime(content),
        ...(data as { title: string; description: string; date: string; tags: string[]; draft: boolean; featured: boolean; image?: string }),
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
        const { html, headings } = await markdownToHtml(content);

        return {
            slug,
            content: html,
            headings,
            ...(data as { title: string; description: string; date: string; technologies: string[]; liveUrl?: string; repoUrl?: string; featured: boolean; image?: string }),
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
    const { html, headings } = await markdownToHtml(content);
    
    return {
        slug,
        content: html,
        headings,
        ...(data as { title: string; description: string; date: string; technologies: string[]; liveUrl?: string; repoUrl?: string; featured: boolean; image?: string }),
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
    
    const sections = content.split(/^##\s/m).slice(1);
    
    let summary = '';
    let skills: string[] = [];
    let experience: Experience[] = [];
    let education: Education[] = [];

    sections.forEach(section => {
        const lines = section.trim().split('\n');
        const titleLine = lines.shift()?.trim();
        if (!titleLine) return;

        const title = titleLine.toLowerCase();
        const body = lines.join('\n').trim();

        if (title === 'summary') {
            summary = body;
        } else if (title === 'skills') {
            skills = body.split(',').map(s => s.trim());
        } else if (title === 'experience') {
            const expItems = body.split(/^###\s/m).slice(1);
            experience = expItems.map(item => {
                const itemLines = item.trim().split('\n');
                const role = itemLines.shift()?.trim() || '';
                const expData: Partial<Experience> = { role, description: '' };
                
                let descLines: string[] = [];
                
                itemLines.forEach(line => {
                    const companyMatch = line.match(/\*\*Company:\*\*\s*(.*)/);
                    const periodMatch = line.match(/\*\*Period:\*\*\s*(.*)/);
                    const descriptionMatch = line.match(/\*\*Description:\*\*/);

                    if (companyMatch) expData.company = companyMatch[1].trim();
                    else if (periodMatch) expData.period = periodMatch[1].trim();
                    else if (descriptionMatch) {
                        // The rest of the lines are description
                        const descriptionIndex = itemLines.indexOf(line);
                        descLines = itemLines.slice(descriptionIndex + 1);
                    }
                });
                
                expData.description = descLines.join('\n').trim();

                return expData as Experience;
            });
        } else if (title === 'education') {
            const eduItems = body.split(/^###\s/m).slice(1);
            education = eduItems.map(item => {
                const itemLines = item.trim().split('\n');
                const degree = itemLines.shift()?.trim() || '';
                const eduData: Partial<Education> = { degree };

                itemLines.forEach(line => {
                    const institutionMatch = line.match(/\*\*Institution:\*\*\s*(.*)/);
                    const periodMatch = line.match(/\*\*Period:\*\*\s*(.*)/);
                    if (institutionMatch) eduData.institution = institutionMatch[1].trim();
                    if (periodMatch) eduData.period = periodMatch[1].trim();
                });
                return eduData as Education;
            });
        }
    });

    return { 
        ...(data as Omit<CvData, 'summary'|'skills'|'experience'|'education'>),
        summary,
        skills,
        experience,
        education,
    };
}
