import fs from 'fs';
import path from 'path';
import type { Post, Project, CvData } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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
      const value = valueParts.join(':').trim();
      if (key.trim() === 'tags' || key.trim() === 'technologies') {
        try {
            const parsedValue = JSON.parse(value);
            data[key.trim()] = Array.isArray(parsedValue) ? parsedValue : [];
        } catch(e) {
            data[key.trim()] = value.split(',').map(tag => tag.trim());
        }
      } else if (key.trim() === 'image') {
        const imagePlaceholder = PlaceHolderImages.find(img => img.id === value);
        data[key.trim()] = imagePlaceholder ? imagePlaceholder.imageUrl : '';
      }
      else {
        data[key.trim()] = value.replace(/^['"]|['"]$/g, '');
      }
    }
  });

  return { data, content };
}


export function getSortedPosts(): Post[] {
  const postsDirectory = path.join(contentDirectory, 'blog');
  const filenames = fs.readdirSync(postsDirectory);

  const allPostsData = filenames.map(filename => {
    const slug = filename.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = parseFrontmatter(fileContents);

    return {
      slug,
      content,
      ...data,
    } as Post;
  });

  return allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });
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
        ...data,
    } as Post;
}

export function getSortedProjects(): Project[] {
  const projectsDirectory = path.join(contentDirectory, 'projects');
  const filenames = fs.readdirSync(projectsDirectory);

  return filenames.map(filename => {
    const slug = filename.replace(/\.md$/, '');
    const fullPath = path.join(projectsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = parseFrontmatter(fileContents);

    return {
      slug,
      content,
      ...data,
    } as Project;
  });
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


function parseCvMarkdown(markdown: string) {
    const data: any = {};
    const sections = markdown.split(/\n## /);
    
    // First section for frontmatter-like fields
    const frontmatter = sections[0].split('---')[1];
    frontmatter.trim().split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        data[key.trim()] = valueParts.join(':').trim();
    });

    sections.slice(1).forEach(section => {
        const lines = section.trim().split('\n');
        const titleLine = lines.shift() || '';
        const title = titleLine.trim().toLowerCase().replace(/\s+/g, '_');

        if (title === 'summary') {
            data.summary = lines.join('\n').trim();
        } else if (title === 'skills') {
            const skillsString = lines.join('').replace(/^- /g, '');
             try {
                data.skills = JSON.parse(skillsString);
            } catch (e) {
                data.skills = skillsString.split(',').map(s => s.trim());
            }
        } else if (title === 'experience') {
            data.experience = [];
            let currentItem: any = {};
            for (const line of lines) {
                if (line.startsWith('### ')) {
                    if (currentItem.role) data.experience.push(currentItem);
                    currentItem = { role: line.replace('### ', '').trim(), description: '' };
                } else if (line.startsWith('**Company:**')) {
                    currentItem.company = line.replace('**Company:**', '').trim();
                } else if (line.startsWith('**Period:**')) {
                    currentItem.period = line.replace('**Period:**', '').trim();
                } else if (!line.startsWith('* ') && line.trim() !== '') {
                    currentItem.description += line.trim() + ' ';
                }
            }
            if (currentItem.role) data.experience.push(currentItem);
        } else if (title === 'education') {
             data.education = [];
            let currentItem: any = {};
            for (const line of lines) {
                 if (line.startsWith('### ')) {
                    if (currentItem.degree) data.education.push(currentItem);
                    currentItem = { degree: line.replace('### ', '').trim() };
                } else if (line.startsWith('**Institution:**')) {
                    currentItem.institution = line.replace('**Institution:**', '').trim();
                } else if (line.startsWith('**Period:**')) {
                    currentItem.period = line.replace('**Period:**', '').trim();
                }
            }
            if (currentItem.degree) data.education.push(currentItem);
        }
    });

    const avatarPlaceholder = PlaceHolderImages.find(img => img.id === 'cv-avatar');
    if (avatarPlaceholder) {
        data.avatar = avatarPlaceholder.imageUrl;
    }

    return data as CvData;
}


export function getCVData(): CvData {
    const filePath = path.join(contentDirectory, 'cv.md');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return parseCvMarkdown(fileContents);
}
