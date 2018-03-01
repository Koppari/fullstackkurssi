import React from 'react'

const LoginForm = ({handleSubmit, onChange, username, password}) => {
    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={onChange}
                        placeholder="Username"/>
                </div>
                <div>
                    <input
                        type="text"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="Password"/>
                </div>
                <button type="submit">Log in</button>
            </form>
        </div>
    )
}

export default LoginForm