

# FleFolio - Portfolio Website Blueprint

## Project Overview

FleFolio is a modern, responsive personal portfolio website that showcases projects, blog posts, and professional information. The site leverages markdown files for content management and integrates with external APIs to provide a comprehensive view of the developer's skills and activities.

## Technical Architecture

### Framework & Technology Stack
- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **Markdown Processing**: remark for markdown parsing and rendering
- **Deployment**: GitHub Pages with static export (`output: 'export'`)

### Project Structure
```
flefolio/
├── app/
│   ├── (routes)/
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── cv/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   └── codestats/route.ts
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── badge.tsx
│   ├── project/
│   │   ├── project-card.tsx
│   │   ├── project-filter.tsx
│   │   └── project-detail.tsx
│   ├── blog/
│   │   ├── post-card.tsx
│   │   ├── post-list.tsx
│   │   └── post-detail.tsx
│   └── cv/
│       ├── cv-section.tsx
│       └── skill-bar.tsx
├── content/
│   ├── projects/
│   │   └── *.md
│   ├── blog/
│   │   └── *.md
│   └── cv/
│       └── info.md
├── lib/
│   ├── markdown.ts
│   ├── codestats.ts
│   └── utils.ts
├── public/
│   └── images/
├── types/
│   └── index.ts
└── next.config.js
```

## Core Features

### 1. Project Showcase
- **Dynamic Content Loading**: Projects loaded from `content/projects/*.md` files
- **Project Cards**: Display title, description, technologies, live/demo link, and GitHub repo link
- **Advanced Filtering**: Filter by technology, category, or status
- **Search Functionality**: Real-time search through projects
- **Project Details**: Dedicated pages with full descriptions and technical details

### 2. Blog System
- **Markdown Rendering**: Full markdown support with syntax highlighting
- **Post Management**: Posts in `content/blog/*.md` with frontmatter
- **Rich Features**: Table of contents, code blocks with line numbers
- **Organization**: Tag system and categories
- **Interaction**: Reading time, word count, and pagination
- **SEO**: Automatic sitemap generation and meta tags

### 3. CodeStats Integration
- **API Integration**: Fetch data from `https://codestats.net/users/fless`
- **Visualizations**: Charts for language distribution and XP over time
- **Data Caching**: Implement caching to reduce API calls
- **Error Handling**: Graceful handling of API failures

### 4. CV/Resume Section
- **Comprehensive Information**: Contact, experience, education, skills, certifications
- **Multiple Formats**: Web view, printable version, and downloadable PDF
- **Interactive Elements**: Expandable sections and skill progress bars
- **Professional Design**: Clean, print-friendly layout

### 5. Content Management
- **Markdown-Based**: All content managed through markdown files
- **Frontmatter Schema**: Consistent structure for all content types
- **Content Validation**: Type checking for markdown content and frontmatter

## Content Management

### Markdown Structure
```
content/
├── projects/
│   ├── project-1.md
│   ├── project-2.md
│   └── _index.md (projects page content)
├── blog/
│   ├── post-1.md
│   ├── post-2.md
│   └── _index.md (blog page content)
└── cv/
    └── info.md
```

### Frontmatter Schemas

#### Project Schema
```yaml
---
title: "Project Title"
description: "Brief project description"
date: "2023-11-15"
technologies: ["React", "Next.js", "TypeScript"]
liveUrl: "https://flessan.pages.dev"
repoUrl: "https://github.com/flessan/repo"
featured: true
status: "completed" # completed, in-progress, planned
category: "web" # web, mobile, desktop, tool
tags: ["frontend", "fullstack", "opensource"]
---
```

#### Blog Post Schema
```yaml
---
title: "Blog Post Title"
description: "Brief post description"
date: "2023-11-15"
tags: ["javascript", "react", "tutorial"]
category: "tutorial" # tutorial, thoughts, news, case-study
draft: false
featured: true
---
```

## Style Guidelines

### Color Palette
- **Primary Color**: Dark electric blue (#7DF9FF) - Used for headings, links, and primary actions
- **Background Color**: Very dark grey (#121212) - Main background color
- **Accent Color**: Soft purple (#D09CFA) - Used for highlights, buttons, and interactive elements
- **Surface Color**: Slightly lighter grey (#1E1E1E) - For cards and elevated elements
- **Text Colors**:
  - Primary text: #FFFFFF
  - Secondary text: #B0B0B0
  - Muted text: #808080

### Typography
- **Headings & Body**: 'Inter' sans-serif font
  - Headings: font-weight 600-800
  - Body text: font-weight 400
  - Small text: font-weight 300
- **Code**: 'Source Code Pro' monospaced font
- **Font Sizes**:
  - H1: 2.5rem (40px)
  - H2: 2rem (32px)
  - H3: 1.5rem (24px)
  - Body: 1rem (16px)
  - Small: 0.875rem (14px)

### Layout & Spacing
- **Container**: Max-width of 1200px, centered
- **Grid System**: 12-column responsive grid
- **Spacing**: Use Tailwind's spacing scale (4px base unit)
- **Section Padding**: 4rem (64px) top and bottom
- **Card Padding**: 1.5rem (24px)

### Interactive Elements
- **Transitions**: Smooth transitions (200-300ms) for all interactive elements
- **Hover States**: Subtle color changes and elevation
- **Focus States**: Clear focus indicators for accessibility
- **Buttons**: Rounded corners (0.5rem), with hover and focus states
- **Cards**: Subtle borders, shadow on hover

### Responsive Design
- **Mobile-First Approach**: Design for mobile first, then scale up
- **Breakpoints**:
  - Small: 640px
  - Medium: 768px
  - Large: 1024px
  - Extra Large: 1280px
- **Navigation**: Collapsible hamburger menu on mobile
- **Grid Adjustments**: Adjust grid columns based on screen size

## Performance & Accessibility

### Performance Optimization
- **Image Optimization**: Use next/image for optimized images
- **Code Splitting**: Implement dynamic imports for non-critical components
- **Caching Strategy**: Implement proper caching for API responses
- **Bundle Size Optimization**: Analyze and optimize bundle size
- **Loading States**: Implement skeleton loaders for content

### Accessibility Requirements
- **Semantic HTML**: Use proper HTML5 semantic elements
- **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
- **ARIA Labels**: Add appropriate ARIA labels for screen readers
- **Color Contrast**: Ensure WCAG AA compliance for color contrast
- **Focus Indicators**: Clear focus indicators for all interactive elements
- **Alt Text**: Provide descriptive alt text for all images

## Deployment Strategy

### GitHub Pages Deployment
- **Static Export**: Configure Next.js for static export (`output: 'export'`)
- **Build Process**: Optimize build process for production
- **GitHub Actions**: Implement CI/CD pipeline for automated deployment
- **Custom Domain**: Configure custom domain if needed
- **404 Page**: Implement proper 404 page

### Environment Configuration
- **Development**: Local development with hot reload
- **Production**: Optimized production build
- **Environment Variables**: Secure management of API keys and sensitive data

## Future Enhancements

### Potential Features
- **Dark/Light Mode Toggle**: Allow users to switch between themes
- **Contact Form**: Implement a contact form for user inquiries
- **Newsletter Subscription**: Add newsletter signup functionality
- **Social Media Integration**: Display social media feeds or links
- **Project Showcase**: Interactive demos or videos of projects
- **Blog Comments**: Add commenting system for blog posts

### Technical Improvements
- **Progressive Web App**: Convert to PWA for offline functionality
- **Advanced Search**: Implement fuzzy search for content
- **Content Recommendations**: Add related content suggestions
- **Internationalization**: Add support for multiple languages
- **Advanced Analytics**: Implement more detailed user analytics