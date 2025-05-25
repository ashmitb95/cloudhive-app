import { z } from 'zod';
import { Priority } from '@/types/idea';

export const ideaSchema = z.object({
  summary: z.string().min(1, 'Summary is required').max(100, 'Summary must be less than 100 characters'),
  description: z.string().min(1, 'Description is required').max(1000, 'Description must be less than 1000 characters'),
  employeeId: z.string().min(1, 'Employee ID is required'),
  priority: z.nativeEnum(Priority).default(Priority.MEDIUM),
  submittedBy: z.object({
    id: z.string(),
    name: z.string(),
    avatar: z.string().optional()
  })
});

export type IdeaFormData = z.infer<typeof ideaSchema>; 