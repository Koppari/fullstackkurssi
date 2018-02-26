import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService
      .getAll()
      .then(blogs => this.setState({blogs}))

    const loggedUserJSON = window
      .localStorage
      .getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }

  login = async(e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({username: this.state.username, password: this.state.password})
      this.setState({username: '', password: '', user})
      window
        .localStorage
        .setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (e) {
      this.setState({error: 'Invalid username or password.'})
      setTimeout(() => {
        this.setState({error: null})
      }, 5000)
    }
  }

  logout = async(e) => {
    e.preventDefault()
    window
      .localStorage
      .clear()
    this.setState({user: null})
  }

  handleLoginDetailsChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <h2>Log in</h2>
          <form onSubmit={this.login}>
            <div>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleLoginDetailsChange}
                placeholder="Username"/>
            </div>
            <div>
              <input
                type="text"
                name="password"
                value={this.state.password}
                onChange={this.handleLoginDetailsChange}
                placeholder="Password"/>
            </div>
            <button type="submit">Log in</button>
          </form>
        </div>
      )
    }

    return (
      <div>
        <h2>Blogs</h2>
        <div>
          <p>Logged in as {this.state.user.name}
            <br></br>
            <button onClick={this.logout}>Log out</button>
          </p>
        </div>
        {this
          .state
          .blogs
          .map(blog => <Blog key={blog._id} blog={blog}/>)}
      </div>
    );
  }
}

export default App;
