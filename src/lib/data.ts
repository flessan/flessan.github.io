import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string): ImagePlaceholder => {
  const image = PlaceHolderImages.find((img) => img.id === id);
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
}

export const projects: Project[] = [
  {
    slug: 'project-one',
    title: 'Data Visualization Platform',
    description: 'A web-based platform for creating and sharing interactive data visualizations.',
    image: getImage('project-one'),
    detailImage: getImage('project-detail-one'),
    content: `
## Overview
This project is a comprehensive data visualization tool designed for data scientists and analysts. It allows users to upload datasets, generate various types of charts and graphs, and customize them with an intuitive interface.

### Key Features
- File Upload: Supports CSV, JSON, and Excel formats.
- Chart Library: Includes bar charts, line charts, pie charts, scatter plots, and heatmaps.
- Interactive Dashboards: Users can combine multiple visualizations into a single dashboard.
- Exporting: Visualizations can be exported as PNG, JPEG, or SVG.

### Technologies Used
- React
- D3.js
- Node.js
- Express
- MongoDB
`,
    links: {
      github: '#',
      live: '#',
    },
  },
  {
    slug: 'project-two',
    title: 'E-commerce Storefront',
    description: 'A fully-featured e-commerce site with a custom CMS for product management.',
    image: getImage('project-two'),
    detailImage: getImage('project-detail-two'),
    content: `
## Overview
A modern, responsive e-commerce storefront built from the ground up. It includes a complete shopping cart flow, user authentication, and a powerful admin dashboard for managing products, orders, and customers.

### Key Features
- Product Management: A custom CMS for adding, editing, and deleting products.
- Shopping Cart: Persistent cart functionality using local storage and database sync.
- Payment Integration: Securely integrated with Stripe for payment processing.
- User Accounts: Customers can create accounts, view order history, and manage their information.

### Technologies Used
- Next.js
- TypeScript
- PostgreSQL
- Prisma
- Stripe API
`,
    links: {
      github: '#',
      live: '#',
    },
  },
  {
    slug: 'project-three',
    title: 'Mobile Task Manager',
    description: 'A cross-platform mobile app for organizing tasks and improving productivity.',
    image: getImage('project-three'),
    detailImage: getImage('project-detail-one'),
    content: `
## Overview
This is a simple yet effective task management application for iOS and Android. It helps users keep track of their daily tasks, set reminders, and categorize their to-do lists.

### Key Features
- Task Creation: Easily add new tasks with due dates and priority levels.
- Push Notifications: Get reminders for upcoming tasks.
- Offline Sync: Works offline and syncs data when a connection is available.
- Cross-Platform: A single codebase for both iOS and Android.

### Technologies Used
- React Native
- Redux
- Firebase
- Expo
`,
    links: {
      github: '#',
      live: '#',
    },
  },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: ImagePlaceholder;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'mastering-css-grid',
    title: 'A Complete Guide to Mastering CSS Grid',
    excerpt: 'In this post, we take a deep dive into CSS Grid, exploring its powerful features and how you can use it to create complex, responsive layouts with ease.',
    date: '2023-10-26',
    image: getImage('blog-one'),
    content: `
CSS Grid Layout is a two-dimensional layout system for the web. It lets you lay content out in rows and columns, and has many features that make building complex layouts straightforward.

### The Two-Dimensional System
Unlike Flexbox, which is largely a one-dimensional system, Grid is a two-dimensional system. This means it can handle both columns and rows, which is what makes it so powerful for page layouts.

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 100px;
  gap: 10px;
}
\`\`\`

### Conclusion
CSS Grid is a game-changer for web layout. By understanding its core concepts, you can build just about any layout you can imagine.
`,
  },
  {
    slug: 'server-components-in-nextjs',
    title: 'Understanding React Server Components in Next.js',
    excerpt: 'React Server Components are a new paradigm in web development. Learn what they are, how they work in Next.js, and why they are a game-changer for performance.',
    date: '2023-09-15',
    image: getImage('blog-one'),
    content: `
React Server Components (RSCs) allow you to write UI that is rendered on the server and streamed to the client. This reduces the amount of JavaScript sent to the browser, which can significantly improve initial page load times.

### Key Benefits
- Zero-Bundle-Size: Server Components don't get included in the client-side JavaScript bundle.
- Direct Backend Access: They can access server-side resources like databases or file systems directly.
- Automatic Code Splitting: They act as "split points," allowing client components to be loaded on demand.

### Example
\`\`\`jsx
// This is a Server Component
async function MyServerComponent() {
  const data = await db.query('...');
  return <div>{data.message}</div>;
}
\`\`\`

This component runs only on the server, fetching data and rendering HTML before it's ever sent to the client.
`,
  },
];

export const aboutMeImage = getImage('about-me');
