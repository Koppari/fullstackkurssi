import React from 'react'
import {connect} from 'react-redux'
import {newAnecdote} from '../reducers/anecdoteReducer'
import {newNotification, removeNotification} from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
    addAnecdote = (e) => {
        e.preventDefault()
        this
            .props
            .newAnecdote(e.target.anecdote.value)
        e.target.anecdote.value = ''

        this
            .props
            .newNotification("Anecdote added.")
        setTimeout(() => {
            this
                .props
                .removeNotification()
        }, 3000)
    }

    render() {
        return (
            <div>
                <h2>Create a new anecdote</h2>
                <form onSubmit={this.addAnecdote}>
                    <div><input name="anecdote"/>{' '}
                        <button>Create</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {anecdotes: state.anecdotes}
}

const mapDispatchToProps = {
    newAnecdote,
    newNotification,
    removeNotification
}

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm