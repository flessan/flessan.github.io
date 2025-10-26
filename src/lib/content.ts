import fs from 'fs';
import path from 'path';
import type { Post, Project, CvData } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { remark } from 'remark';
import strip from 'strip-markdown';

const contentDirectory = path.join(process.cwd(), 'src', 'content');

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontmatter = match ? match[1] : '';
  const content = match ? fileContent.slice(match[0].length).trim() : fileContent;
  
  const data: { [key: string]: any } = {};
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      let value = valueParts.join(':').trim();
      const lowerKey = key.trim().toLowerCase();

      if (lowerKey === 'tags' || lowerKey === 'technologies') {
        try {
            const parsedValue = JSON.parse(value);
            data[key.trim()] = Array.isArray(parsedValue) ? parsedValue : [];
        } catch(e) {
            data[key.trim()] = value.split(',').map(tag => tag.trim());
        }
      } else if (lowerKey === 'image') {
        const imagePlaceholder = PlaceHolderImages.find(img => img.id === value);
        data[key.trim()] = imagePlaceholder ? imagePlaceholder.imageUrl : '';
      } else if (lowerKey === 'featured' || lowerKey === 'draft') {
        data[key.trim()] = value.toLowerCase() === 'true';
      } else {
        data[key.trim()] = value.replace(/^['"]|['"]$/g, '');
      }
    }
  });

  return { data, content };
}

function calculateReadingTime(content: string) {
    const text = remark().use(strip).processSync(content).toString();
    const wordsPerMinute = 200;
    const noOfWords = text.split(/\s/g).length;
    const minutes = noOfWords / wordsPerMinute;
    return Math.ceil(minutes);
}

export function getSortedPosts(): Post[] {
  const postsDirectory = path.join(contentDirectory, 'blog');
  if (!fs.existsSync(postsDirectory)) return [];

  const filenames = fs.readdirSync(postsDirectory);

  const allPostsData = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
        const slug = filename.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = parseFrontmatter(fileContents);

        return {
            slug,
            content,
            readingTime: calculateReadingTime(content),
            ...data,
        } as Post;
    })
    .filter(post => !post.draft);

  return allPostsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
    const postsDirectory = path.join(contentDirectory, 'blog');
    const filePath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        return undefined;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = parseFrontmatter(fileContents);

    return {
        slug,
        content,
        readingTime: calculateReadingTime(content),
        ...data,
    } as Post;
}

export function getSortedProjects(): Project[] {
  const projectsDirectory = path.join(contentDirectory, 'projects');
  if (!fs.existsSync(projectsDirectory)) return [];

  const filenames = fs.readdirSync(projectsDirectory);

  return filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
        const slug = filename.replace(/\.md$/, '');
        const fullPath = path.join(projectsDirectory, filename);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = parseFrontmatter(fileContents);

        return {
            slug,
            content,
            ...data,
        } as Project;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}


export function getProjectBySlug(slug: string): Project | undefined {
    const projectsDirectory = path.join(contentDirectory, 'projects');
    const filePath = path.join(projectsDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        return undefined;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = parseFrontmatter(fileContents);

    return {
        slug,
        content,
        ...data,
    } as Project;
}

function parseCvMarkdown(markdown: string): CvData {
    const { data, content } = parseFrontmatter(markdown);

    const cvData: Partial<CvData> = { ...data };

    const sections = content.split(/^##\s/m);

    for (const section of sections) {
        if (!section.trim()) continue;

        const lines = section.trim().split('\n');
        const titleLine = lines.shift() || '';
        const title = titleLine.trim().toLowerCase();

        if (title === 'summary') {
            cvData.summary = lines.join('\n').trim();
        } else if (title === 'skills') {
            cvData.skills = lines.join('').replace(/^- /g, '').split(',').map(s => s.trim());
        } else if (title === 'experience') {
            cvData.experience = [];
            let currentItem: Partial<Experience> = {};
            for (const line of lines) {
                if (line.startsWith('### ')) {
                    if (currentItem.role) cvData.experience.push(currentItem as Experience);
                    currentItem = { role: line.replace('### ', '').trim(), description: '' };
                } else {
                    const match = line.match(/^\*\*(.*?):\*\*\s*(.*)/);
                    if (match) {
                        const key = match[1].toLowerCase();
                        const value = match[2].trim();
                        if (key === 'company') currentItem.company = value;
                        if (key === 'period') currentItem.period = value;
                    } else if (line.trim()) {
                        currentItem.description = (currentItem.description ? currentItem.description + '\n' : '') + line.trim().replace(/^- /, '');
                    }
                }
            }
            if (currentItem.role) cvData.experience.push(currentItem as Experience);
        } else if (title === 'education') {
            cvData.education = [];
            let currentItem: Partial<Education> = {};
            for (const line of lines) {
                 if (line.startsWith('### ')) {
                    if (currentItem.degree) cvData.education.push(currentItem as Education);
                    currentItem = { degree: line.replace('### ', '').trim() };
                } else {
                     const match = line.match(/^\*\*(.*?):\*\*\s*(.*)/);
                     if (match) {
                        const key = match[1].toLowerCase();
                        const value = match[2].trim();
                        if (key === 'institution') currentItem.institution = value;
                        if (key === 'period') currentItem.period = value;
                     }
                 }
            }
            if (currentItem.degree) cvData.education.push(currentItem as Education);
        }
    }
    
    const avatarPlaceholder = PlaceHolderImages.find(img => img.id === 'cv-avatar');
    if (avatarPlaceholder) {
        cvData.avatar = avatarPlaceholder.imageUrl;
    }

    return cvData as CvData;
}


export function getCVData(): CvData {
    const filePath = path.join(contentDirectory, 'cv.md');
    if (!fs.existsSync(filePath)) {
        // Return some default data so the build doesn't break
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
    return parseCvMarkdown(fileContents);
}
