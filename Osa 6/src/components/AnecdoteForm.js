import React from 'react'
import {connect} from 'react-redux'
import {newAnecdote} from '../reducers/anecdoteReducer'
import {notify} from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
    addAnecdote = async(e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        this
            .props
            .newAnecdote(content)
        this
            .props
            .notify("Anecdote added.", 3)
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
    notify
}

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm