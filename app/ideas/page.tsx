'use client'

import { Box, Container, Heading, Grid } from '@radix-ui/themes'
import { IdeaCard } from '@/features/ideas/idea-card'
import { useIdeas } from '@/features/ideas/hooks/use-ideas'

export default function IdeasPage() {
    const { data, isLoading, error } = useIdeas()

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error loading ideas</div>
    }

    return (
        <Container>
            <Box py="6">
                <Heading mb="6">Ideas</Heading>
                <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4">
                    {data?.ideas.map((idea) => (
                        <IdeaCard key={idea.id} idea={idea} />
                    ))}
                </Grid>
            </Box>
        </Container>
    )
} 