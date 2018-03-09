import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import {connect} from 'react-redux'
import {anecdoteInitialization} from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'

class App extends React.Component {
  componentDidMount = async() => {
    const anecdotes = await anecdoteService.getAll()
    this
      .props
      .anecdoteInitialization(anecdotes)
  }

  render() {
    return (
      <div>
        <Notification/>
        <h2>Anecdotes</h2>
        <Filter/>
        <AnecdoteList/>
        <AnecdoteForm/>
      </div>
    )
  }
}

export default connect(null, {anecdoteInitialization})(App)