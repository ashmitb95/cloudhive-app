'use client'

import { Button, Flex, Select, TextField } from '@radix-ui/themes'
import Link from 'next/link'
import { ChangeEvent } from 'react'

type SortOption = 'newest' | 'oldest' | 'priority'
type FilterOption = 'all' | 'pending' | 'approved' | 'rejected'

interface IdeasFilterProps {
    sortBy: SortOption
    filterBy: FilterOption
    searchQuery: string
    onSortChange: (value: SortOption) => void
    onFilterChange: (value: FilterOption) => void
    onSearchChange: (value: string) => void
}

export function IdeasFilter({
    sortBy,
    searchQuery,
    onSortChange,
    onSearchChange,
}: IdeasFilterProps) {
    return (
        <Flex gap="4" align="center" className="w-full">
            <TextField.Root
                className="flex-1"
                placeholder="Search ideas..."
                value={searchQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
            />

            <Select.Root value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
                <Select.Trigger placeholder="Sort by" className="min-w-[150px]" />
                <Select.Content>
                    <Select.Item value="newest">Newest first</Select.Item>
                    <Select.Item value="oldest">Oldest first</Select.Item>
                    <Select.Item value="priority">Priority</Select.Item>
                </Select.Content>
            </Select.Root>

            <Link href="/ideas/new">
                <Button>Submit Idea</Button>
            </Link>
        </Flex>
    )
} 