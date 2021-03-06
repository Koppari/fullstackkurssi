import React from 'react'
import {connect} from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {notify} from '../reducers/notificationReducer'

const style = {
    marginBottom: 7
}

class AnecdoteList extends React.Component {
    vote = (id) => async(e) => {
        e.preventDefault()
        const toVote = this
            .props
            .anecdotes
            .find(a => a.id === id)
        const voted = {
            ...toVote,
            votes: toVote.votes + 1
        }
        this
            .props
            .voteAnecdote(id, voted)
        this
            .props
            .notify("You voted for " + voted.content + ".", 3)
    }

    render() {
        const anecdotes = this
            .props
            .anecdotes
            .filter(a => a.content.toLowerCase().indexOf(this.props.filter.toLowerCase()) > -1)
        return (
            <div>
                {anecdotes.sort((a, b) => a.votes < b.votes).map(anecdote => <div style={style} key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>Has {anecdote.votes}{' '}
                        votes{' '}
                        <button onClick={this.vote(anecdote.id)}>Vote</button>
                    </div>
                </div>)}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {anecdotes: state.anecdotes, filter: state.filter}
}

const mapDispatchToProps = {
    voteAnecdote,
    notify
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList