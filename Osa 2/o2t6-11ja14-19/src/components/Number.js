import React from 'react'

const Number = ({person, remove}) => {
    return (
        <tbody>
            <tr className="person">
                <td>{person.name}</td>
                <td>{person.number}</td>
                <td>
                    <button onClick={remove}>Poista</button>
                </td>
            </tr>
        </tbody>
    )
}

export default Number