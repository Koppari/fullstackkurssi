import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'

class App extends React.Component {
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

export default App