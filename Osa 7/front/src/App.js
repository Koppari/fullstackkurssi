import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {Container, Button, Table} from 'semantic-ui-react'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import User from './components/User'
import UserList from './components/UserList'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogCreationForm from './components/BlogCreationForm'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import './index.css'

const TopMenu = ({user, logout}) => (
  <div className="ui blue inverted menu">
    <Link to='/' className="item">Blogs</Link>&nbsp;
    <Link to='/users' className="item">Users</Link>&nbsp;
    <div className="right menu">
      <div className="item">Logged in as {user.name}</div>
      <Button onClick={logout} className="ui basic button">Log out</Button >
    </div>
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      users: [],
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
    const users = await userService.getAll()
    this.setState({blogs: blogs})
    this.setState({users: users})
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
      let idForNewBlog = await blogService.getAll()
      idForNewBlog = idForNewBlog
        .slice(-1)
        .pop()
      blogObject.id = idForNewBlog.id

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

  deleteOnClick = (id, history) => {
    return async() => {
      try {
        history.push('/')
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
            .map((blog, i) => <BlogList
              key={i}
              id={blog.id}
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

    const users = () => {
      return (
        <div>
          <h2>List of users</h2>
          <table class="ui blue table">
            <thead>
              <tr>
                <th>User</th>
                <th>Username</th>
                <th>Blogs</th>
              </tr>
            </thead>
            <tbody>
              {this
                .state
                .users
                .map(user => <UserList key={user.id} user={user}/>)}
            </tbody>
          </table>
        </div>
      )
    }

    const userById = (id) => this
      .state
      .users
      .find(user => user.id === id)

    const blogById = (id) => this
      .state
      .blogs
      .find(blog => blog.id === id)

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
      <Container>
        <div>
          <Router>
            <div>
              <TopMenu user={this.state.user} logout={this.logout}/>
              <h1>Blogs</h1>

              <div>
                <Notification message={this.state.success} type="success"/>
                <Notification message={this.state.error} type="error"/>
              </div>

              {blogCreation()}<br/>

              <Route exact path="/" render={() => blogs()}/>
              <Route
                exact
                path="/blogs/:id"
                render={({match, history}) => <Blog
                history={history}
                blog={blogById(match.params.id)}
                likeButton={this.likeOnClick(match.params.id)}
                deleteButton={this.deleteOnClick(match.params.id, history)}
                loggedUser={this.state.user.name}/>}/>

              <Route exact path="/users" render={() => users()}/>
              <Route
                exact
                path="/users/:id"
                render={({match}) => <User user={userById(match.params.id)}/>}/>

            </div>
          </Router>
        </div>
      </Container>
    )
  }
}

export default App;
