import { getEmployees } from '@/lib/actions/employees';
import { IdeaForm } from '@/features/ideas/idea-form';

export default async function NewIdeaPage() {
    const employees = await getEmployees();

    return (
        <main className="container mx-auto py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Submit New Idea</h1>
                <IdeaForm employees={employees} />
            </div>
        </main>
    );
} 