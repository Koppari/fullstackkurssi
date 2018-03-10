import React from 'react'

const Blog = ({blog, loggedUser, likeButton, deleteButton}) => {
    const conditionalDeletionButton = () => {
        if (loggedUser === blog.user.username) {
            return (
                <button onClick={deleteButton}>Delete</button>
            )
        } else if (blog.user.username == null) {
            return (
                <button onClick={deleteButton}>Delete</button>
            )
        }
    }
    return (
        <div>
            <h1>{blog.title}</h1>
            <a href={"https://" + blog.url}>{blog.url}</a><br/> {blog.likes}{' '}
            Likes
            <button onClick={likeButton}>Like</button><br/>
            Added by {blog.user.username}<br/>
            {conditionalDeletionButton()}
        </div>
    )
}

export default Blog