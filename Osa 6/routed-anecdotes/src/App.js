import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {Container, Table, Form, Button, Message} from 'semantic-ui-react'

const Menu = ({style}) => (
  <div style={style} className="ui menu">
    <Link to='/' className="item">Anecdotes</Link>&nbsp;
    <Link to='/create' className="item">Create new</Link>&nbsp;
    <Link to='/about' className="item">About</Link>&nbsp;
  </div>
)

const AnecdoteList = ({anecdotes}) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped celled>
      <Table.Body>
        {anecdotes.map(anecdote => <Table.Row key={anecdote.id}>
          <Table.Cell>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </Table.Cell>
          <Table.Cell>
            {anecdote.author}
          </Table.Cell>
        </Table.Row>)}
      </Table.Body>
    </Table>
  </div>
)

const Anecdote = ({anecdote}) => {
  return (
    <div>
      <h2>{anecdote.content}{' '}
        by {anecdote.author}</h2>
      <p>Has {anecdote.votes}{' '}
        votes</p>
      <p>Additional info at{' '}
        <a href={anecdote.info}>{anecdote.info}</a>.</p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <div className="ui grid">
      <div className="eleven wide column" style={{
        fontSize: "17px"
      }}>
        <p>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an
          incident. Occasionally humorous, anecdotes differ from jokes because their
          primary purpose is not simply to provoke laughter but to reveal a truth more
          general than the brief tale itself, such as to characterize a person by
          delineating a specific quirk or trait, to communicate an abstract idea about a
          person, place, or thing through the concrete details of a short narrative. An
          anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find
          the best and add more.</p>
      </div>
      <div className="thee wide column"><img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Edsger_Wybe_Dijkstra.jpg/800px-Edsger_Wybe_Dijkstra.jpg"
        alt=""
        height="320"
        width="240"/></div>
    </div>
  </div>
)

const Footer = () => (
  <div>
    <br/>
    Anecdote app for{' '}
    <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>. See{' '}
    <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a>{' '}
    for the original source code used.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this
      .props
      .addNew({content: this.state.content, author: this.state.author, info: this.state.info, votes: 0})
    this
      .props
      .history
      .push('/')
  }

  render() {
    return (
      <div>
        <h2>Create a new anecdote</h2>
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div>
            Content{' '}
            <input
              name='content'
              placeholder='Content'
              value={this.state.content}
              onChange={this.handleChange}/>
          </div>
          <div>
            Author{' '}
            <input
              name='author'
              placeholder='Author'
              value={this.state.author}
              onChange={this.handleChange}/>
          </div>
          <div>
            Url for more info{' '}
            <input
              name='info'
              placeholder='Url'
              value={this.state.info}
              onChange={this.handleChange}/>
          </div>
          <button className="ui button">Create</button>
        </form>
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        }, {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = async(anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this
        .state
        .anecdotes
        .concat(anecdote)
    })
    this.setState({
      notification: this.state.notification = `${anecdote.content} has been added to the list of anecdotes!`
    })
    await setTimeout(() => {
      this.setState({
        notification: this.state.notification = ''
      })
    }, 10000)
  }

  anecdoteById = (id) => this
    .state
    .anecdotes
    .find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this
      .state
      .anecdotes
      .map(a => a.id === id
        ? voted
        : a)

    this.setState({anecdotes})
  }

  render() {
    const notificationStyle = {
      backgroundColor: '#e9ffd9',
      border: '.1em solid',
      borderColor: '#D1FAB6',
      padding: '3px',
      marginBottom: '15px'
    }

    const menuStyle = {
      backgroundColor: '#f3fcfd',
      border: '.1em solid',
      borderColor: '#8ed9f6',
      padding: '3px',
      marginBottom: '15px'
    }

    return (
      <Container>
        <div>
          <Router>
            <div>
              <div className="ui clearing segment">
                <h1>Software anecdotes</h1>
              </div>
              <Menu style={menuStyle}/>
              <div>
                {this.state.notification === ''
                  ? null
                  : <div style={notificationStyle} className="ui positive compact message">{this.state.notification}</div>}
              </div>
              <Route
                exact
                path='/'
                render={() => <AnecdoteList anecdotes={this.state.anecdotes}/>}/>
              <Route
                exact
                path='/anecdotes/:id'
                render={({match}) => <Anecdote anecdote={this.anecdoteById(match.params.id)}/>}/>
              <Route exact path='/about' render={() => <About/>}/>
              <Route
                exact
                path='/create'
                render={({history}) => <CreateNew history={history} addNew={this.addNew}/>}/>
              <Footer/>
            </div>
          </Router>
        </div>
      </Container>
    );
  }
}

export default App;
