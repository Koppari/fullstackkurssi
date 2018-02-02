import React from 'react'

const Number = ({person}) => {
    return (
        <tbody>
            <tr>
                <td>{person.name}</td>
                <td>{person.number}</td>
            </tr>
        </tbody>
    )
}

export default Number