import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_ANECDOTE':
            let newAnecdote = action.anecdote
            return [
                ...state,
                newAnecdote
            ]
        case 'VOTE':
            let toVote = state.find(a => a.id === action.id)
            let voted = {
                ...toVote,
                votes: toVote.votes + 1
            }
            return state.map(a => a.id !== action.id
                ? a
                : voted)
        case 'INIT_ANECDOTES':
            return action.anecdotes
        default:
            return [...state]
    }
}

export const newAnecdote = (anecdote) => {
    return async(dispatch) => {
        const newAnecdote = await anecdoteService.createNew(anecdote)
        dispatch({type: 'NEW_ANECDOTE', anecdote: newAnecdote})
    }
}

export const anecdoteInitialization = () => {
    return async(dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({type: 'INIT_ANECDOTES', anecdotes: anecdotes})
    }
}

export const voteAnecdote = (id, votedAnecdote) => {
    return async(dispatch) => {
        const updatedAnecdote = await anecdoteService.update(id, votedAnecdote)
        dispatch({type: 'VOTE', id: updatedAnecdote.id})
    }
}

export default anecdoteReducer
