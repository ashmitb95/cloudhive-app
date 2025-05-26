import { Suspense } from 'react';
import { IdeasList } from '@/features/ideas/ideas-list';

export default function HomePage() {
    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Feature Ideas</h1>
            </div>
            <Suspense fallback={<div>Loading ideas...</div>}>
                <IdeasList />
            </Suspense>
        </div>
    );
} 