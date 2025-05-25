import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Idea } from '@/types/idea';
import { Employee } from '@/types/employee';
import { voteIdea, deleteIdea } from '@/lib/actions/ideas';

interface IdeaDetailsProps {
    idea: Idea;
    employees: Employee[];
}

export function IdeaDetails({ idea, employees }: IdeaDetailsProps) {
    const router = useRouter();
    const [isVoting, setIsVoting] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const handleVote = async (type: 'upvote' | 'downvote') => {
        try {
            debugger
            setIsVoting(type);
            await voteIdea(idea.id, type);
            router.refresh();
        } catch (error) {
            console.error('Failed to vote:', error);
        } finally {
            setIsVoting(null);
        }
    };

    const handleDelete = async () => {
        try {
            setIsDeleting(idea.id);
            await deleteIdea(idea.id);
            router.push('/');
        } catch (error) {
            console.error('Failed to delete:', error);
        } finally {
            setIsDeleting(null);
        }
    };

    const getEmployeeName = (employeeId: string) => {
        return employees.find(emp => emp.id === employeeId)?.name || 'Unknown';
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold mb-2">{idea.summary}</h1>
                    <p className="text-gray-600 mb-4">{idea.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>By {getEmployeeName(idea.employeeId)}</span>
                        <span>Priority: {idea.priority}</span>
                        <span>Created: {new Date(idea.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="ghost"
                        onClick={() => handleVote('upvote')}
                        disabled={isVoting === 'upvote'}
                    >
                        👍 {idea.upvotes}
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => handleVote('downvote')}
                        disabled={isVoting === 'downvote'}
                    >
                        👎 {idea.downvotes}
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={handleDelete}
                        disabled={isDeleting === idea.id}
                    >
                        🗑️
                    </Button>
                </div>
            </div>
        </div>
    );
} 