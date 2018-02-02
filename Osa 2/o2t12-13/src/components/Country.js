import React from 'react'

const Country = ({country, onClick}) => {
    return (
        <table>
            <tbody>
                <tr>
                    <td onClick={onClick}>{country.name}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Country