import type { Post, Project, CvData } from '@/lib/types';

// These functions now fetch data from the API route
// This avoids bundling server-side code (like 'fs') on the client.

const getBaseUrl = () => {
    if (typeof window !== 'undefined') return '';
    if (process.env.NEXT_PUBLIC_VERCEL_URL) return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    return 'http://localhost:9002';
};

const API_URL = `${getBaseUrl()}/api/content`;

export async function getSortedPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${API_URL}/posts`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const res = await fetch(`${API_URL}/posts/${slug}`, { cache: 'no-store' });
    if (!res.ok) return undefined;
    return res.json();
  } catch (error) {
    console.error(`Failed to fetch post by slug ${slug}:`, error);
    return undefined;
  }
}

export async function getSortedProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_URL}/projects`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  try {
    const res = await fetch(`${API_URL}/projects/${slug}`, { cache: 'no-store' });
    if (!res.ok) return undefined;
    return res.json();
  } catch (error) {
    console.error(`Failed to fetch project by slug ${slug}:`, error);
    return undefined;
  }
}

export async function getCVData(): Promise<CvData | null> {
  try {
    const res = await fetch(`${API_URL}/cv`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch CV data:", error);
    return null;
  }
}
