
export enum Status {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected'
}

export enum Priority {
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low'
}

export interface Employee {
  id: string
  name: string
  avatar?: string
}

export interface Idea {
  id: string
  summary: string
  description: string
  status: Status
  priority: Priority
  submittedBy: Employee
  createdAt: string
  updatedAt: string
  employeeId: string
  upvotes: number
  downvotes: number
  comments: Comment[]
}

export interface Comment {
    id: string
    content: string
    createdAt: string
    employeeId: string
}

export type IdeaFormData = Omit<Idea, 'id' | 'upvotes' | 'downvotes' | 'createdAt'>; 