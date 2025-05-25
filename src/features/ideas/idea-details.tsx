'use client'

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

    const priorityColor = idea.priority === 'high' ? 'bg-red-100 text-red-700' : idea.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700';

    return (
        <div className="max-w-2xl mx-auto mt-8 p-8 bg-white rounded-2xl shadow-lg space-y-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2 text-gray-900">{idea.summary}</h1>
                    <div className="flex items-center gap-2 mb-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${priorityColor}`}>{idea.priority.toUpperCase()}</span>
                        <span className="text-gray-400 text-xs">Created: {new Date(idea.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-700 text-lg mb-4">{idea.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>By <span className="font-medium text-gray-700">{getEmployeeName(idea.employeeId)}</span></span>
                    </div>
                </div>
                <div className="flex flex-row sm:flex-col gap-2 sm:items-end">
                    <Button
                        variant="ghost"
                        onClick={() => handleVote('upvote')}
                        disabled={isVoting === 'upvote'}
                        className="flex items-center gap-1 border border-gray-200 hover:bg-green-50"
                    >
                        👍 <span className="font-semibold">{idea.upvotes}</span>
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => handleVote('downvote')}
                        disabled={isVoting === 'downvote'}
                        className="flex items-center gap-1 border border-gray-200 hover:bg-red-50"
                    >
                        👎 <span className="font-semibold">{idea.downvotes}</span>
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={handleDelete}
                        disabled={isDeleting === idea.id}
                        className="flex items-center gap-1 border border-gray-200 hover:bg-gray-100 text-gray-500"
                    >
                        🗑️ <span>Delete</span>
                    </Button>
                </div>
            </div>
        </div>
    );
} 