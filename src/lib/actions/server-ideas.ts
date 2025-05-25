'use server'

import { revalidatePath } from 'next/cache'
import { Idea, IdeaFormData, Status, Employee } from '@/types/idea'
import { ideaSchema } from '@/lib/schemas/idea'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs/promises'
import path from 'path'

const IDEAS_FILE_PATH = path.join(process.cwd(), 'ideas.json')

async function readIdeas(): Promise<{ ideas: Idea[] }> {
    try {
        const data = await fs.readFile(IDEAS_FILE_PATH, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        console.error('Error reading ideas:', error)
        return { ideas: [] }
    }
}

async function writeIdeas(data: { ideas: Idea[] }): Promise<void> {
    try {
        await fs.writeFile(IDEAS_FILE_PATH, JSON.stringify(data, null, 2))
    } catch (error) {
        console.error('Error writing ideas:', error)
        throw new Error('Failed to write ideas to file')
    }
}

export async function getIdeas(page = 1, limit = 20, searchQuery = '', filterBy = 'all') {
    const { ideas } = await readIdeas()
    
    // Apply search and filter first
    let filteredIdeas = ideas.filter(idea => {
        // Apply status filter
        if (filterBy !== 'all' && idea.status !== filterBy) {
            return false
        }
        
        // Apply search filter
        if (searchQuery) {
            const searchLower = searchQuery.toLowerCase()
            return (
                idea.summary.toLowerCase().includes(searchLower) ||
                idea.description.toLowerCase().includes(searchLower)
            )
        }
        
        return true
    })

    // Sort ideas by createdAt in descending order (newest first)
    const sortedIdeas = [...filteredIdeas].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    // Apply pagination
    const start = (page - 1) * limit
    const end = start + limit
    
    return {
        ideas: sortedIdeas.slice(start, end),
        total: filteredIdeas.length,
        page,
        limit,
        totalPages: Math.ceil(filteredIdeas.length / limit)
    }
}

export async function getIdea(id: string) {
    const { ideas } = await readIdeas()
    return ideas.find(idea => idea.id === id)
}

export async function createIdea(data: IdeaFormData) {
    const { ideas } = await readIdeas()
    const validatedData = ideaSchema.parse(data)
    
    const newIdea: Idea = {
        id: uuidv4(),
        ...validatedData,
        status: Status.PENDING,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        upvotes: 0,
        downvotes: 0,
        comments: []
    }

    ideas.push(newIdea)
    await writeIdeas({ ideas })
    revalidatePath('/ideas')
    return newIdea
}

export async function updateIdea(id: string, data: Partial<Idea>) {
    const { ideas } = await readIdeas()
    const index = ideas.findIndex(idea => idea.id === id)
    if (index === -1) return null

    const updatedIdea = {
        ...ideas[index],
        ...data,
        updatedAt: new Date().toISOString()
    }

    ideas[index] = updatedIdea
    await writeIdeas({ ideas })
    revalidatePath('/ideas')
    return updatedIdea
}

export async function deleteIdea(id: string) {
    const { ideas } = await readIdeas()
    const filteredIdeas = ideas.filter(idea => idea.id !== id)
    await writeIdeas({ ideas: filteredIdeas })
    revalidatePath('/ideas')
    return true
}

export async function voteIdea(id: string, type: 'upvote' | 'downvote') {
    const { ideas } = await readIdeas()
    const index = ideas.findIndex(idea => idea.id === id)
    if (index === -1) return null

    const idea = ideas[index]
    if (type === 'upvote') {
        idea.upvotes++
    } else {
        idea.downvotes++
    }

    ideas[index] = idea
    await writeIdeas({ ideas })
    revalidatePath('/ideas')
    return idea
} 