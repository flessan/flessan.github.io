---
title: "FleFolio - This Portfolio"
description: "My personal portfolio website, designed and developed to showcase my projects and blog. Built with Next.js, Tailwind CSS, and deployed as a static site."
date: "2024-07-21"
technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Static Site"]
liveUrl: "#"
repoUrl: "#"
featured: true
image: "portfolio-website"
---

This is the very portfolio you are looking at right now! It's a personal project designed to be a central hub for my professional life, showcasing my skills, projects, and thoughts on technology. The entire project was built from the ground up with specific goals in mind.

### Core Objectives

*   **Modern & Performant:** Build a fast, server-rendered website using the latest web technologies. The goal was to achieve excellent Lighthouse scores, particularly for performance and SEO.
*   **Clean Aesthetics & UX:** Create a visually appealing and easy-to-navigate user interface that is fully responsive and accessible.
*   **Content-Driven Architecture:** Use a Markdown-based approach for easy management of blog posts and project descriptions, decoupling the content from the code.
*   **Static & Deployable:** The entire site needed to be pre-rendered into static assets (`HTML`, `CSS`, `JS`) so it could be deployed easily and cheaply on platforms like GitHub Pages or Vercel.

### Technical Deep Dive

The project is built on a foundation of **Next.js** and its App Router, which provides a powerful and flexible architecture.

#### Key Next.js Features Used:
- **Static Site Generation (SSG)**: The entire site is generated at build time using `output: 'export'`. This means every page is a static HTML file, which leads to incredibly fast load times and is great for SEO.
- **App Router**: I used the `app` directory structure, which allows for intuitive file-based routing and layouts.
- **Server Components**: Most components are React Server Components (RSCs) by default. They run at build time on the server, fetching data and rendering HTML. This reduces the amount of JavaScript sent to the client. Client-side interactivity is then opted into where needed with the `'use client'` directive.
- **`next/image`**: Used for all images to ensure they are optimized, responsive, and lazy-loaded, contributing to better performance.

#### Styling
Styling is handled by **Tailwind CSS** for a utility-first workflow. This allows for rapid development and highly maintainable styles without writing custom CSS files. For components, I've used **Shadcn/ui**, which provides a set of beautifully designed and accessible components (like buttons, cards, dialogs) that are easy to customize. The theming (including light and dark mode) is controlled via CSS variables in `globals.css`, as recommended by Shadcn.

#### Content Management
All content, including this project description and the blog posts, is written in **Markdown**. A custom script in `src/lib/content.ts` uses Node.js's `fs` module to read these `.md` files at build time. It parses the frontmatter (the metadata at the top of the file) and the Markdown content itself.

This approach provides a simple but effective Git-based Content Management System (CMS). To add a new blog post, I simply create a new `.md` file in the `content/blog` directory and push it to my repository. The site automatically rebuilds and deploys with the new content.

```typescript
// Simplified logic from `lib/content.ts`
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export function getSortedPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '');
    
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use a library like gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as { title: string; date: string; ... }),
    };
  });
  // ... sort posts by date
}
```

This setup strikes a great balance between developer experience, performance, and simplicity. It demonstrates a modern approach to building static, content-driven websites.
