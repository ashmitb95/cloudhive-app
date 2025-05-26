'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Employee } from '@/types/employee';
import { useVoteIdea, useIdea, useDeleteIdea } from '@/hooks/use-ideas';
import { ArrowLeft } from 'lucide-react';

interface IdeaDetailsProps {
    ideaId: string;
    employees: Employee[];
}

export function IdeaDetails({ ideaId, employees }: IdeaDetailsProps) {
    const router = useRouter();
    const voteMutation = useVoteIdea();
    const deleteMutation = useDeleteIdea();
    const { data: idea, isLoading, error } = useIdea(ideaId);

    const handleVote = async (type: 'upvote' | 'downvote') => {
        if (!idea) return;
        try {
            await voteMutation.mutateAsync({ id: idea.id, type });
        } catch (error) {
            console.error('Failed to vote:', error);
        }
    };

    const handleDelete = async () => {
        if (!idea) return;
        try {
            await deleteMutation.mutateAsync(idea.id);
            router.push('/');
        } catch (error) {
            console.error('Failed to delete:', error);
        }
    };

    const handleBack = () => {
        router.push('/');
    };

    const getEmployeeName = (employeeId: string) => {
        return employees.find(emp => emp.id === employeeId)?.name || 'Unknown';
    };

    const getPriorityStyles = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-700 border-red-200';
            case 'medium':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'low':
                return 'bg-green-100 text-green-700 border-green-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <Button
                            variant="outline"
                            onClick={handleBack}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200 text-gray-600 font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Ideas
                        </Button>
                    </div>
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="p-8 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading idea...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !idea) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <Button
                            variant="outline"
                            onClick={handleBack}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200 text-gray-600 font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Ideas
                        </Button>
                    </div>
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="p-8 text-center">
                            <p className="text-red-600">Error loading idea. Please try again.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <div className="mb-6">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200 text-gray-600 font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Ideas
                    </Button>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                    <span className="text-2xl">💡</span>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-white mb-1">{idea.summary}</h1>
                                    <p className="text-blue-100 text-sm">
                                        By {getEmployeeName(idea.employeeId)} • {new Date(idea.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className={`px-4 py-2 rounded-full text-sm font-semibold border ${getPriorityStyles(idea.priority)}`}>
                                {idea.priority.toUpperCase()} PRIORITY
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
                            <p className="text-gray-700 text-lg leading-relaxed bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                {idea.description}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => handleVote('upvote')}
                                    disabled={voteMutation.isPending}
                                    className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-green-200 hover:bg-green-50 hover:border-green-300 transition-all duration-200 text-green-700 font-semibold"
                                >
                                    <span className="text-lg">👍</span>
                                    <span>{idea.upvotes}</span>
                                    <span className="hidden sm:inline">Upvote</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => handleVote('downvote')}
                                    disabled={voteMutation.isPending}
                                    className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-200 text-red-700 font-semibold"
                                >
                                    <span className="text-lg">👎</span>
                                    <span>{idea.downvotes}</span>
                                    <span className="hidden sm:inline">Downvote</span>
                                </Button>
                            </div>
                            <Button
                                variant="outline"
                                onClick={handleDelete}
                                disabled={deleteMutation.isPending}
                                className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-gray-600 font-semibold"
                            >
                                <span className="text-lg">🗑️</span>
                                <span>{deleteMutation.isPending ? 'Deleting...' : 'Delete'}</span>
                            </Button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Idea ID: {idea.id}</span>
                            <span>Total votes: {idea.upvotes + idea.downvotes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 