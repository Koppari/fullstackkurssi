import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: anecdotes[Math.floor(Math.random() * anecdotes.length)]
    }
  }

  randomAnec = () => {
    this.setState({selected: anecdotes[Math.floor(Math.random() * anecdotes.length)]})
  }

  vote = () => {
    const anecdote = this.state.selected
    anecdote.votes++
    this.forceUpdate();
  }

  mostVotes = () => {
    var maxVotes = this.props.anecdotes.reduce(function(sum, value) {
    return (sum.votes > value.votes) ? sum : value;
    }, this.props.anecdotes[0]);

    return (
        <div>
            <p>{maxVotes.anecdote}</p>
            has {maxVotes.votes} votes
        </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.selected.anecdote}
        
        <p>has {this.state.selected.votes} votes</p>

        <div>
            <button onClick={this.randomAnec}>
                next anecdote
            </button>
            <button onClick={this.vote}>
                vote
            </button>
        </div>

        <h2>anecdote with most votes:</h2>

        {this.mostVotes()}

      </div>
    )
  }
}

const anecdotes = [
{
    anecdote: 'If it hurts, do it more often',
    votes: 0
},
{
    anecdote: 'Adding manpower to a late software project makes it later!',
    votes: 0
},
{
    anecdote:  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 0
},
{
    anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 0
},
{
    anecdote: 'Premature optimization is the root of all evil.',
    votes: 0
},
{
    anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 0
}];

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
