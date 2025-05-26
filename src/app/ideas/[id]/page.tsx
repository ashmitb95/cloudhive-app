import { getEmployees } from '@/lib/actions/employees';
import { IdeaDetails } from '@/features/ideas/idea-details';

export default async function IdeaDetailsPage({
    params,
}: {
    params: { id: string };
}) {
    const employees = await getEmployees();

    return (
        <main className="container mx-auto py-8">
            <div className="max-w-2xl mx-auto">
                <IdeaDetails ideaId={params.id} employees={employees} />
            </div>
        </main>
    );
} 