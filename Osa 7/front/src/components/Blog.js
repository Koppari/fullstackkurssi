import React from 'react'
import {Button} from 'semantic-ui-react'

const Blog = ({blog, loggedUser, likeButton, deleteButton}) => {
    const conditionalDeletionButton = () => {
        if (loggedUser === blog.user.username) {
            return (
                <Button onClick={deleteButton} className="ui secondary button" size="tiny" compact="true">Delete</Button>
            )
        } else if (blog.user.username == null) {
            return (
                <Button onClick={deleteButton} className="ui secondary button" size="tiny" compact="true">Delete</Button>
            )
        }
    }
    return (
        <div>
            <h1>{blog.title}</h1>
            <a href={"https://" + blog.url}>{blog.url}</a><br/> {blog.likes}{' '}
            Likes{' '}
            <Button onClick={likeButton} className="ui basic button" size="tiny" compact="true">Like</Button><br/>
            Added by {blog.user.username}<br/>
            {conditionalDeletionButton()}
        </div>
    )
}

export default Blog