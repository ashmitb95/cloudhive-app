'use client'

import { Flex, Select, TextField } from '@radix-ui/themes'
import { Idea, Priority } from '@/types/idea'

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
    filterBy,
    searchQuery,
    onSortChange,
    onFilterChange,
    onSearchChange,
}: IdeasFilterProps) {
    return (
        <Flex gap="4" align="center">
            <TextField.Slot>
                <input
                    placeholder="Search ideas..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full px-3 py-2"
                />
            </TextField.Slot>

            <Select.Root value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
                <Select.Trigger placeholder="Sort by" />
                <Select.Content>
                    <Select.Item value="newest">Newest first</Select.Item>
                    <Select.Item value="oldest">Oldest first</Select.Item>
                    <Select.Item value="priority">Priority</Select.Item>
                </Select.Content>
            </Select.Root>
        </Flex>
    )
} 