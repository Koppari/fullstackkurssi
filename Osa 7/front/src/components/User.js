import React from 'react'

const User = ({user}) => (
        <tr>
            <td headers="username">
                {user.username}
            </td>
            <td headers="name">
                {user.name}
            </td>
            <td headers="blogs">
                {user.blogs.length}
            </td>
        </tr>
)

export default User
