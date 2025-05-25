import { Idea } from '@/types/idea'
import fs from 'fs/promises'
import path from 'path'


const IDEAS_FILE_PATH = path.join(process.cwd(), 'src/data/ideas.json')

export async function getMockIdeas(): Promise<Idea[]> {
    try {
        const data = await fs.readFile(IDEAS_FILE_PATH, 'utf-8')
        const parsed = JSON.parse(data)
        return parsed.ideas
    } catch (error) {
        console.error('Error reading mock ideas:', error)
        return []
    }
} 