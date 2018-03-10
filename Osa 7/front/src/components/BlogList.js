import React from 'react'
import {Link} from 'react-router-dom'

class BlogList extends React.Component {
  render() {
    const blogStyle = {
      paddingTop: 4,
      paddingBottom: 4,
      paddingLeft: 20,
      marginBottom: 2
    }

    return (
      <div style={blogStyle} className="wrapper">
        <div className="listedinfo">
          <Link to={`/blogs/${this.props.id}`} key={this.props.title}>{this.props.title}{' '}
            by {this.props.author}</Link>
        </div>
      </div>
    )
  }
}

export default BlogList