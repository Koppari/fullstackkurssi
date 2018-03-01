import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogCreationForm from './components/BlogCreationForm'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
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
      error: null,
      blogCreationVisible: false
    }
  }

  componentDidMount = async() => {
    const blogs = await blogService.getAll()
    this.setState({blogs: blogs})

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
    this
      .blogCreationVisible
      .toggleVisibility()
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

  likeOnClick = (id) => {
    return async() => {
      try {
        const blog = this
          .state
          .blogs
          .find(b => b.id === id)
        const likedBlog = {
          ...blog,
          likes: blog.likes + 1
        }
        await blogService.update(id, likedBlog)
        this.setState({
          blogs: this
            .state
            .blogs
            .map(blog => blog.id !== id
              ? blog
              : likedBlog),
          success: 'Like registered.'
        })
        setTimeout(() => {
          this.setState({success: null})
        }, 3000)
      } catch (e) {
        this.setState({error: 'Something went wrong.'})
        setTimeout(() => {
          this.setState({error: null})
        }, 3000)
      }
    }
  }

  deleteOnClick = (id) => {
    return async() => {
      try {
        const blog = this
          .state
          .blogs
          .find(b => b.id === id)
        await blogService.remove(blog.id)
        this.setState({
          blogs: this
            .state
            .blogs
            .filter(blog => blog.id !== id),
          success: "Blog deleted."
        })
        setTimeout(() => {
          this.setState({success: null})
        }, 3000)
      } catch (e) {
        this.setState({error: 'Deletion failed.'})
        setTimeout(() => {
          this.setState({error: null})
        }, 3000)
      }
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
    const blogs = () => {
      return (
        <div>
          <h2>List of blogs</h2>
          {this
            .state
            .blogs
            .sort((a, b) => a.likes < b.likes)
            .map(blog => <Blog
              loggedUser={this.state.user.name}
              key={blog.id}
              title={blog.title}
              author={blog.author}
              url={blog.url}
              likes={blog.likes}
              username={blog.user.username}
              likeOnClick={this.likeOnClick(blog.id)}
              deleteOnClick={this.deleteOnClick(blog.id)}/>)}
        </div>
      )
    }

    const blogCreation = () => {
      return (
        <div>
          <Toggleable
            buttonLabel="Create"
            ref={component => this.blogCreationVisible = component}>
            <BlogCreationForm
              handleSubmit={this.addBlog}
              onChange={this.handleNewBlogDetailsChange}
              title={this.state.title}
              author={this.state.author}
              url={this.state.url}/>
          </Toggleable>
        </div>
      )
    }

    if (this.state.user === null) {
      return (
        <div>
          <LoginForm
            handleSubmit={this.login}
            onChange={this.handleLoginDetailsChange}
            username={this.state.username}
            password={this.state.password}/>
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

        {blogCreation()}

        {blogs()}

      </div>
    )
  }
}

export default App;
