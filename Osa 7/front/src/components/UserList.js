import React from 'react'
import {Link} from 'react-router-dom'

const UserList = ({user}) => (
    <tr>
        <td headers="username">
            <Link to={`/users/${user.id}`}>{user.username}</Link>
        </td>
        <td headers="name">
            {user.name}
        </td>
        <td headers="blogs">
            {user.blogs.length}
        </td>
    </tr>
)

export default UserList