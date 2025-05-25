'use client'

import { useRouter } from 'next/navigation'
import { Flex, TextField, Select, TextArea, Button, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Employee, Priority, Status } from '@/types/idea'
import { useCreateIdea } from '@/hooks/use-ideas'

const formSchema = z.object({
    summary: z.string().min(1, 'Summary is required'),
    description: z.string().min(1, 'Description is required'),
    employeeId: z.string().min(1, 'Employee is required'),
    priority: z.nativeEnum(Priority)
})

type FormData = z.infer<typeof formSchema>

interface IdeaFormProps {
    employees: Employee[]
}

export function IdeaForm({ employees }: IdeaFormProps) {
    const router = useRouter()
    const createIdea = useCreateIdea()

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            priority: Priority.MEDIUM
        }
    })

    const onSubmit = async (data: FormData) => {
        try {
            await createIdea.mutateAsync({
                ...data,
                status: Status.PENDING,
                submittedBy: employees.find(emp => emp.id === data.employeeId)!,
                updatedAt: new Date().toISOString(),
                comments: []
            })
            router.push('/')
        } catch (error) {
            console.error('Failed to create idea:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap="4">
                {createIdea.error && (
                    <Text color="red" size="2">
                        Failed to create idea. Please try again.
                    </Text>
                )}

                <TextField.Root>
                    <TextField.Slot>
                        <input
                            placeholder="Summary"
                            {...register('summary')}
                            className="w-full px-3 py-2"
                            disabled={createIdea.isPending}
                        />
                    </TextField.Slot>
                </TextField.Root>
                {errors.summary && (
                    <Text color="red" size="2">{errors.summary.message}</Text>
                )}

                <TextArea
                    placeholder="Description"
                    {...register('description')}
                    className="w-full px-3 py-2"
                    disabled={createIdea.isPending}
                />
                {errors.description && (
                    <Text color="red" size="2">{errors.description.message}</Text>
                )}

                <Select.Root
                    value={watch('employeeId')}
                    onValueChange={(value) => setValue('employeeId', value)}
                    disabled={createIdea.isPending}
                >
                    <Select.Trigger placeholder="Select employee" />
                    <Select.Content>
                        {employees.map((employee) => (
                            <Select.Item key={employee.id} value={employee.id}>
                                {employee.name}
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Root>
                {errors.employeeId && (
                    <Text color="red" size="2">{errors.employeeId.message}</Text>
                )}

                <Select.Root
                    value={watch('priority')}
                    onValueChange={(value) => setValue('priority', value as Priority)}
                    disabled={createIdea.isPending}
                >
                    <Select.Trigger placeholder="Select priority" />
                    <Select.Content>
                        <Select.Item value={Priority.HIGH}>High</Select.Item>
                        <Select.Item value={Priority.MEDIUM}>Medium</Select.Item>
                        <Select.Item value={Priority.LOW}>Low</Select.Item>
                    </Select.Content>
                </Select.Root>
                {errors.priority && (
                    <Text color="red" size="2">{errors.priority.message}</Text>
                )}

                <Flex gap="4" justify="end">
                    <Button
                        variant="soft"
                        onClick={() => router.push('/')}
                        disabled={createIdea.isPending}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={createIdea.isPending}
                    >
                        {createIdea.isPending ? 'Submitting...' : 'Submit Idea'}
                    </Button>
                </Flex>
            </Flex>
        </form>
    )
} 