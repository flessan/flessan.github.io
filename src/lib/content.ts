import { getSortedPosts as getSortedPostsFromApi, getPostBySlug as getPostBySlugFromApi, getSortedProjects as getSortedProjectsFromApi, getProjectBySlug as getProjectBySlugFromApi, getCVData as getCVDataFromApi } from './content-api';
import type { Post, Project, CvData } from '@/lib/types';

// These functions now directly call the API functions that read from the filesystem.
// This is suitable for a static site generation (SSG) approach with `output: 'export'`.

export async function getSortedPosts(): Promise<Post[]> {
  return getSortedPostsFromApi();
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  return getPostBySlugFromApi(slug);
}

export async function getSortedProjects(): Promise<Project[]> {
  return getSortedProjectsFromApi();
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return getProjectBySlugFromApi(slug);
}

export async function getCVData(): Promise<CvData | null> {
  return getCVDataFromApi();
}
