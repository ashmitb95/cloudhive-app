import { 
    getIdeas as getIdeasServer,
    getIdea as getIdeaServer,
    createIdea as createIdeaServer,
    updateIdea as updateIdeaServer,
    deleteIdea as deleteIdeaServer,
    voteIdea as voteIdeaServer
} from './server-ideas'

export const getIdeas = getIdeasServer
export const getIdea = getIdeaServer
export const createIdea = createIdeaServer
export const updateIdea = updateIdeaServer
export const deleteIdea = deleteIdeaServer
export const voteIdea = voteIdeaServer 