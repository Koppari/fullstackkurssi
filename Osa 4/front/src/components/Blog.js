import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  render() {
    const toggleDetails = () => {
      this.setState({
        visible: !this.state.visible
      })
    }

    const details = () => {
      if (this.state.visible) {
        return (
          <div>
            <a href={"https://"+this.props.url}>{this.props.url}</a><br/>
            {this.props.likes} Likes <button onClick={this.props.likeOnClick}>Like</button><br/>
            Added by {this.props.username}
          </div>
        )
      }
    }

    const blogStyle = {
      paddingTop: 4,
      paddingBottom: 4,
      paddingLeft: 20,
      marginBottom: 2
    }

    return (
      <div style={blogStyle}>
        <div onClick={toggleDetails}>
          {this.props.title} by {this.props.author}
        </div>
          {details()}
      </div>
    )
  }
}

export default Blog