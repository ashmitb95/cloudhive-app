import { Idea, Priority, Status, Employee } from '@/types/idea'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs/promises'
import path from 'path'

const mockEmployees: Employee[] = [
    { id: 'emp1', name: 'Alice Developer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice&backgroundColor=ffdfbf&hair=shortHair&hairColor=red' },
    { id: 'emp2', name: 'Bob Coder', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob&backgroundColor=ffdfbf&hair=shortHair&hairColor=blue' },
    { id: 'emp3', name: 'Carol Engineer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol&backgroundColor=ffdfbf&hair=shortHair&hairColor=green' }
]

const IDEAS_FILE_PATH = path.join(process.cwd(), 'ideas.json')

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