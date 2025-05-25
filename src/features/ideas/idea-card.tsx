'use client'

import { Card, Text, Badge, Flex, Avatar, Button, Box, AlertDialog } from '@radix-ui/themes'
import { Idea } from '@/types/idea'
import { useVoteIdea, useDeleteIdea } from '@/hooks/use-ideas'
import { ThumbsUp, ThumbsDown, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface IdeaCardProps {
    idea: Idea
}

export function IdeaCard({ idea }: IdeaCardProps) {
    const voteMutation = useVoteIdea()
    const deleteMutation = useDeleteIdea()

    const handleVote = async (type: 'upvote' | 'downvote') => {
        try {
            await voteMutation.mutateAsync({ id: idea.id, type })
        } catch (error) {
            console.error('Error voting:', error)
        }
    }

    const handleDelete = async () => {
        try {
            await deleteMutation.mutateAsync(idea.id)
        } catch (error) {
            console.error('Error deleting:', error)
        }
    }

    return (
        <Card>
            <Flex direction="column" gap="3">
                <Flex justify="between" align="center">
                    <Text size="5" weight="bold">
                        <Link href={`/ideas/${idea.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            {idea.summary}
                        </Link>
                    </Text>
                    <Badge color={idea.priority === 'high' ? 'red' : idea.priority === 'medium' ? 'yellow' : 'green'}>
                        {idea.priority}
                    </Badge>
                </Flex>

                <Text size="2" color="gray">
                    <Link href={`/ideas/${idea.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {idea.description}
                    </Link>
                </Text>

                <Flex justify="between" align="center">
                    <Flex gap="2" align="center">
                        <Avatar
                            size="1"
                            src={idea.submittedBy.avatar}
                            fallback={idea.submittedBy.name[0]}
                        />
                        <Text size="2">{idea.submittedBy.name}</Text>
                    </Flex>
                </Flex>

                <Box className="border-t pt-3">
                    <Flex gap="2">
                        <Button
                            variant="ghost"
                            size="1"
                            onClick={() => handleVote('upvote')}
                            disabled={voteMutation.isPending}
                        >
                            <ThumbsUp className="w-4 h-4" />
                            <Text size="1">{idea.upvotes}</Text>
                        </Button>
                        <Button
                            variant="ghost"
                            size="1"
                            onClick={() => handleVote('downvote')}
                            disabled={voteMutation.isPending}
                        >
                            <ThumbsDown className="w-4 h-4" />
                            <Text size="1">{idea.downvotes}</Text>
                        </Button>
                        <AlertDialog.Root>
                            <AlertDialog.Trigger>
                                <Button
                                    variant="ghost"
                                    size="1"
                                    color="red"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </AlertDialog.Trigger>
                            <AlertDialog.Content>
                                <AlertDialog.Title>Delete Idea</AlertDialog.Title>
                                <AlertDialog.Description>
                                    Are you sure you want to delete this idea? This action cannot be undone.
                                </AlertDialog.Description>
                                <Flex gap="3" mt="4" justify="end">
                                    <AlertDialog.Cancel>
                                        <Button variant="soft" color="gray">
                                            Cancel
                                        </Button>
                                    </AlertDialog.Cancel>
                                    <AlertDialog.Action>
                                        <Button
                                            variant="solid"
                                            color="red"
                                            onClick={handleDelete}
                                            disabled={deleteMutation.isPending}
                                        >
                                            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                                        </Button>
                                    </AlertDialog.Action>
                                </Flex>
                            </AlertDialog.Content>
                        </AlertDialog.Root>
                    </Flex>
                </Box>
            </Flex>
        </Card>
    )
} 