'use client'

import { Suspense } from 'react';
import { IdeasList } from '@/features/ideas/ideas-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useIdeas } from '@/features/ideas/hooks/use-ideas';

export default function HomePage() {
    const { data, isLoading, error } = useIdeas();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading ideas</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Feature Ideas</h1>
                <Link href="/ideas/new">
                    <Button>Submit Idea</Button>
                </Link>
            </div>

            <Suspense fallback={<div>Loading ideas...</div>}>
                <IdeasList ideas={data?.ideas || []} />
            </Suspense>
        </div>
    );
} 