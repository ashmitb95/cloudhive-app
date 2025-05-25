'use client'

import { Flex, Text } from '@radix-ui/themes'
import { Idea, Priority } from '@/types/idea'
import { IdeaCard } from './idea-card'
import { IdeasFilter } from './ideas-filter'
import { useState, useMemo } from 'react'

type SortOption = 'newest' | 'oldest' | 'priority'
type FilterOption = 'all' | 'pending' | 'approved' | 'rejected'

const priorityOrder: Record<Priority, number> = {
    high: 3,
    medium: 2,
    low: 1,
}

interface IdeasListProps {
    ideas: Idea[]
}

export function IdeasList({ ideas }: IdeasListProps) {
    const [sortBy, setSortBy] = useState<SortOption>('newest')
    const [filterBy, setFilterBy] = useState<FilterOption>('all')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredIdeas = useMemo(() => {
        return ideas
            .filter((idea) => {
                if (filterBy === 'all') return true
                return idea.status === filterBy
            })
            .filter((idea) => {
                if (!searchQuery) return true
                return (
                    idea.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    idea.description.toLowerCase().includes(searchQuery.toLowerCase())
                )
            })
            .sort((a, b) => {
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
    }, [ideas, sortBy, filterBy, searchQuery])

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

            {filteredIdeas.length === 0 ? (
                <Text align="center" color="gray">
                    No ideas found
                </Text>
            ) : (
                <Flex direction="column" gap="4">
                    {filteredIdeas.map((idea) => (
                        <IdeaCard key={idea.id} idea={idea} />
                    ))}
                </Flex>
            )}
        </Flex>
    )
} 