import React from 'react';

class App extends React.Component {
  addAnecdote = (e) => {
    e.preventDefault()
    console.log(e.target.anecdote.value);
    this
      .props
      .store
      .dispatch({anecdote: e.target.anecdote.value, type: 'NEW_ANECDOTE'})
  }

  render() {
    const anecdotes = this
      .props
      .store
      .getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => a.votes < b.votes).map(anecdote => <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>has {anecdote.votes} votes
            <button
              onClick={e => this
              .props
              .store
              .dispatch({id: anecdote.id, type: 'VOTE'})}>vote</button>
          </div>
        </div>)}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="anecdote"/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default App