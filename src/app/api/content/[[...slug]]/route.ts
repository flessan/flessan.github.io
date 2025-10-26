import { getCVData, getPostBySlug, getSortedPosts, getSortedProjects } from "@/lib/content-api";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
    const slug = params.slug || [];

    try {
        if (slug[0] === 'posts' && slug.length === 1) {
            const posts = getSortedPosts();
            return NextResponse.json(posts);
        }
        if (slug[0] === 'posts' && slug.length === 2) {
            const post = getPostBySlug(slug[1]);
            if (post) {
                return NextResponse.json(post);
            }
            return new NextResponse('Post not found', { status: 404 });
        }
        if (slug[0] === 'projects' && slug.length === 1) {
            const projects = getSortedProjects();
            return NextResponse.json(projects);
        }
        if (slug[0] === 'cv' && slug.length === 1) {
            const cvData = getCVData();
            return NextResponse.json(cvData);
        }

        return new NextResponse('Not Found', { status: 404 });
    } catch (error) {
        console.error(error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
