import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      title: '',
      author: '',
      url: '',
      success: null,
      error: null
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

  addBlog = async(e) => {
    e.preventDefault()
    try {
      const blogObject = {
        user: this.state.user,
        title: this.state.title,
        author: this.state.author,
        url: this.state.url,
        likes: 0
      }
      await blogService.create(blogObject)

      this.setState({
        blogs: this
          .state
          .blogs
          .concat(blogObject),
        title: '',
        author: '',
        url: '',
        success: 'Blog added!'
      })
      setTimeout(() => {
        this.setState({success: null})
      }, 3000)
    } catch (e) {
      this.setState({error: 'Blog couldnt be added.'})
      setTimeout(() => {
        this.setState({error: null})
      }, 3000)
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
      }, 3000)
    }
  }

  logout = async(e) => {
    e.preventDefault()
    window
      .localStorage
      .clear()
    this.setState({user: null, success: 'You have logged out.'})
    setTimeout(() => {
      this.setState({success: null})
    }, 3000)
  }

  handleNewBlogDetailsChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
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

          <Notification message={this.state.success} type="success"/>
          <Notification message={this.state.error} type="error"/>

        </div>
      )
    }

    return (

      <div>
        <h1>Blogs</h1>

        <div>
          <Notification message={this.state.success} type="success"/>
          <Notification message={this.state.error} type="error"/>
        </div>

        <div>
          <p>Logged in as {this.state.user.name}
            <br/>
            <button onClick={this.logout}>Log out</button>
          </p>
        </div>

        <div>
          <h2>Create a new entry</h2>
          <form onSubmit={this.addBlog}>
            <div>
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleNewBlogDetailsChange}
                placeholder="Title"/>
            </div>
            <div>
              <input
                type="text"
                name="author"
                value={this.state.author}
                onChange={this.handleNewBlogDetailsChange}
                placeholder="Author"/>
            </div>
            <div>
              <input
                type="text"
                name="url"
                value={this.state.url}
                onChange={this.handleNewBlogDetailsChange}
                placeholder="Url"/>
            </div>
            <button>Create</button>
          </form>
        </div>

        <div>
          <h2>List of blogs</h2>
          {this
            .state
            .blogs
            .map(blog => <Blog key={blog._id} blog={blog}/>)}
        </div>
      </div>
    );
  }
}

export default App;
