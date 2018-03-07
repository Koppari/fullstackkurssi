const anecdotesAtStart = [
    'If it hurts, do it more often', 'Adding manpower to a late software project makes it later!', 'The first 90 percent of the code accounts for the first 90 percent of the develo' +
            'pment time...The remaining 10 percent of the code accounts for the other 90 perc' +
            'ent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write c' +
            'ode that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if' +
            ' you write the code as cleverly as possible, you are, by definition, not smart e' +
            'nough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {content: anecdote, id: getId(), votes: 0}
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_ANECDOTE':
            let newAnecdote = asObject(action.anecdote)
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
        default:
            return [...state]
    }
}

export const newAnecdote = (anecdote) => {
    return {type: 'NEW_ANECDOTE', anecdote: anecdote}
}

export const voteAnecdote = (id) => {
    return {type: 'VOTE', id: id}
}

export default anecdoteReducer 
