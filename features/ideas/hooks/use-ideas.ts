'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createIdea, deleteIdea, getIdeas, getIdea, updateIdea, voteIdea } from '@/lib/actions/ideas'
import { Idea, IdeaFormData } from '@/types/idea'
import { useState, useCallback } from 'react'

const IDEAS_QUERY_KEY = 'ideas'
const IDEAS_PER_PAGE = 20

export function useIdeas() {
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterBy, setFilterBy] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['ideas', page, searchQuery, filterBy],
    queryFn: () => getIdeas(page, IDEAS_PER_PAGE, searchQuery, filterBy)
  })

  const totalPages = data?.totalPages || 1
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setPage(1) // Reset to first page when searching
  }, [])

  const handleFilter = useCallback((filter: 'all' | 'pending' | 'approved' | 'rejected') => {
    setFilterBy(filter)
    setPage(1) // Reset to first page when filtering
  }, [])

  return {
    data,
    isLoading,
    error,
    page,
    setPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    searchQuery,
    setSearchQuery: handleSearch,
    filterBy,
    setFilterBy: handleFilter
  }
}

export function useIdea(id: string) {
  return useQuery({
    queryKey: [IDEAS_QUERY_KEY, id],
    queryFn: () => getIdea(id)
  })
}

export function useCreateIdea() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: IdeaFormData) => createIdea(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [IDEAS_QUERY_KEY] })
    }
  })
}

export function useUpdateIdea() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Idea> }) => updateIdea(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [IDEAS_QUERY_KEY] })
    }
  })
}

export function useDeleteIdea() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteIdea(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [IDEAS_QUERY_KEY] })
    }
  })
}

export function useVoteIdea() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, type }: { id: string; type: 'upvote' | 'downvote' }) => voteIdea(id, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [IDEAS_QUERY_KEY] })
    }
  })
} 