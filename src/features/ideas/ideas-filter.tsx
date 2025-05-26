'use client'

import { Button, Flex, Select, TextField } from '@radix-ui/themes'
import Link from 'next/link'

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

            <TextField.Root className="flex-1">
                <TextField.Slot>
                    <input
                        placeholder="Search ideas..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full px-3 py-2"
                    />
                </TextField.Slot>
            </TextField.Root>

            <Select.Root value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
                <Select.Trigger placeholder="Sort by" className="min-w-[150px]" />
                <Select.Content>
                    <Select.Item value="newest">Newest first</Select.Item>
                    <Select.Item value="oldest">Oldest first</Select.Item>
                    <Select.Item value="priority">Priority</Select.Item>
                </Select.Content>
            </Select.Root>
            <div className="flex justify-between items-center mb-8">
                <Link href="/ideas/new">
                    <Button>Submit Idea</Button>
                </Link>
            </div>
        </Flex>
    )
} 