'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalPosts: number;
    postsPerPage: number;
}

export default function PaginationControls({
    hasNextPage,
    hasPrevPage,
    totalPosts,
    postsPerPage,
}: PaginationControlsProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const page = searchParams.get('page') ?? '1';
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const handlePageChange = (direction: 'prev' | 'next') => {
        const currentPage = Number(page);
        const newPage = direction === 'prev' ? currentPage - 1 : currentPage + 1;

        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('page', String(newPage));
        router.push(`${pathname}?${newSearchParams.toString()}`);
    }

    return (
        <div className="flex items-center justify-between gap-4 mt-12">
            <Button
                variant="outline"
                onClick={() => handlePageChange('prev')}
                disabled={!hasPrevPage}
            >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
            </Button>

            <div className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
            </div>

            <Button
                variant="outline"
                onClick={() => handlePageChange('next')}
                disabled={!hasNextPage}
            >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    )
}
