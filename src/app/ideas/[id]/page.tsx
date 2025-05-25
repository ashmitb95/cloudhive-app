import { notFound } from 'next/navigation';
import { getIdea } from '@/lib/actions/ideas';
import { getEmployees } from '@/lib/actions/employees';
import { IdeaDetails } from '@/features/ideas/idea-details';

export default async function IdeaDetailsPage({
    params,
}: {
    params: { id: string };
}) {
    const [idea, employees] = await Promise.all([
        getIdea(params.id),
        getEmployees(),
    ]);

    if (!idea) {
        notFound();
    }

    return (
        <main className="container mx-auto py-8">
            <div className="max-w-2xl mx-auto">
                <IdeaDetails idea={idea} employees={employees} />
            </div>
        </main>
    );
} 