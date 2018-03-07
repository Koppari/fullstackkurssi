import React from 'react'
import {newAnecdote} from '../reducers/anecdoteReducer'

class AnecdoteForm extends React.Component {
    addAnecdote = (e) => {
        e.preventDefault()
        this
            .props
            .store
            .dispatch(newAnecdote(e.target.anecdote.value))
        e.target.anecdote.value = ''
        console.log(e.target.anecdote.value);
    }

    render() {
        return (
            <div>
                <h2>Create a new anecdote</h2>
                <form onSubmit={this.addAnecdote}>
                    <div><input name="anecdote"/></div>
                    <button>create</button>
                </form>
            </div>
        )
    }
}

export default AnecdoteForm