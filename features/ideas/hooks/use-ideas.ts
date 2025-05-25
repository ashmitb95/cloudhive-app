'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createIdea, deleteIdea, getIdeas, getIdea, updateIdea, voteIdea } from '@/lib/actions/ideas'
import { Idea, IdeaFormData } from '@/types/idea'

const IDEAS_QUERY_KEY = 'ideas'

export function useIdeas(page = 1, limit = 10) {
  return useQuery({
    queryKey: [IDEAS_QUERY_KEY, page, limit],
    queryFn: () => getIdeas(page, limit)
  })
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
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [IDEAS_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [IDEAS_QUERY_KEY, id] })
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
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [IDEAS_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [IDEAS_QUERY_KEY, id] })
    }
  })
} 