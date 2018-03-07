import React from 'react'
import PropTypes from 'prop-types'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {newNotification, removeNotification} from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
    componentDidMount() {
        const {store} = this.context
        this.unsubscribe = store.subscribe(() => this.forceUpdate())
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    vote = (content, id) => async(e) => {
        e.preventDefault()
        this
            .context
            .store
            .dispatch(voteAnecdote(id))
        this
            .context
            .store
            .dispatch(newNotification("You voted for " + content + "."))
        setTimeout(() => {
            this
                .context
                .store
                .dispatch(removeNotification())
        }, 3000)
    }

    render() {
        const anecdotes = this
            .context
            .store
            .getState()
            .anecdotes

        const style = {
            marginBottom: 7
        }

        return (
            <div>
                <h2>Anecdotes</h2>
                {anecdotes.sort((a, b) => a.votes < b.votes).map(anecdote => <div style={style} key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>Has {anecdote.votes} votes <button onClick={this.vote(anecdote.content, anecdote.id)}>Vote</button>
                    </div>
                </div>)}
            </div>
        )
    }
}

AnecdoteList.contextTypes = {
    store: PropTypes.object
}

export default AnecdoteList