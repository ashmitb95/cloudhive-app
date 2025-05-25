'use client'

import { Flex, Text, Button } from '@radix-ui/themes'
import { Idea, Priority } from '@/types/idea'
import { IdeaCard } from './idea-card'
import { IdeasFilter } from './ideas-filter'
import { useState, useMemo } from 'react'
import { useIdeas } from './hooks/use-ideas'
import Link from 'next/link'

type SortOption = 'newest' | 'oldest' | 'priority'

const priorityOrder: Record<Priority, number> = {
    high: 3,
    medium: 2,
    low: 1,
}

export function IdeasList() {
    const [sortBy, setSortBy] = useState<SortOption>('newest')
    const {
        data,
        page,
        setPage,
        totalPages,
        hasNextPage,
        hasPrevPage,
        searchQuery,
        setSearchQuery,
        filterBy,
        setFilterBy
    } = useIdeas()

    const sortedIdeas = useMemo(() => {
        if (!data?.ideas) return []

        return [...data.ideas].sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                case 'oldest':
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                case 'priority':
                    return priorityOrder[b.priority] - priorityOrder[a.priority]
                default:
                    return 0
            }
        })
    }, [data?.ideas, sortBy])

    return (
        <Flex direction="column" gap="4">
            <IdeasFilter
                sortBy={sortBy}
                filterBy={filterBy}
                searchQuery={searchQuery}
                onSortChange={setSortBy}
                onFilterChange={setFilterBy}
                onSearchChange={setSearchQuery}
            />

            {sortedIdeas.length === 0 ? (
                <Text align="center" color="gray">
                    No ideas found
                </Text>
            ) : (
                <>
                    <Flex direction="column" gap="4">
                        {sortedIdeas.map((idea) => (
                            <IdeaCard key={idea.id} idea={idea} />
                        ))}
                    </Flex>

                    <Flex justify="center" gap="2" mt="4">
                        <Button
                            variant="soft"
                            onClick={() => setPage(page - 1)}
                            disabled={!hasPrevPage}
                        >
                            Previous
                        </Button>
                        <Text size="2" align="center" style={{ minWidth: '100px' }}>
                            Page {page} of {totalPages}
                        </Text>
                        <Button
                            variant="soft"
                            onClick={() => setPage(page + 1)}
                            disabled={!hasNextPage}
                        >
                            Next
                        </Button>
                    </Flex>
                </>
            )}
        </Flex>
    )
} 