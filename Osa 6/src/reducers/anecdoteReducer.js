const anecdoteReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_ANECDOTE':
        console.log(action);
        let newAnecdote = action.anecdote
        console.log(newAnecdote);
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
            return action.anecdote
        default:
            return [...state]
    }
}

export const newAnecdote = (anecdote) => {
    return {type: 'NEW_ANECDOTE', anecdote}
}

export const anecdoteInitialization = (anecdote) => {
    return {type: 'INIT_ANECDOTES', anecdote}
}

export const voteAnecdote = (id) => {
    return {type: 'VOTE', id: id}
}

export default anecdoteReducer
