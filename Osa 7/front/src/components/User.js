import React from 'react'

const User = ({user}) => (
    <div>
        <h1>{user.username}</h1>
        <h3>Added blogs</h3>
        <ul>
            {user.blogs.map(blog => {return <li key={blog.title}>{blog.title}</li>})}
        </ul>
    </div>
)

export default User