'use client'

import { Suspense } from 'react';
import { IdeasList } from '@/features/ideas/ideas-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Feature Ideas</h1>
                <Link href="/ideas/new">
                    <Button>Submit Idea</Button>
                </Link>
            </div>

            <Suspense fallback={<div>Loading ideas...</div>}>
                <IdeasList />
            </Suspense>
        </div>
    );
} 