import React from 'react'
import PropTypes from 'prop-types'
import {newAnecdote} from '../reducers/anecdoteReducer'
import {newNotification, removeNotification} from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
    componentDidMount() {
        const {store} = this.context
        this.unsubscribe = store.subscribe(() => this.forceUpdate())
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    addAnecdote = (e) => {
        e.preventDefault()
        this
            .context
            .store
            .dispatch(newAnecdote(e.target.anecdote.value))
        e.target.anecdote.value = ''
        this.context.store.dispatch(newNotification("Anecdote added."))
        setTimeout(() => {this.context.store.dispatch(removeNotification())}, 3000)
    }

    render() {
        return (
            <div>
                <h2>Create a new anecdote</h2>
                <form onSubmit={this.addAnecdote}>
                    <div><input name="anecdote"/></div> <button>Create</button>
                </form>
            </div>
        )
    }
}

AnecdoteForm.contextTypes = {
    store: PropTypes.object
}

export default AnecdoteForm