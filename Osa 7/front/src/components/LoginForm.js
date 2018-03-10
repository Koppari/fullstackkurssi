import React from 'react'
import {Form} from 'semantic-ui-react'
import PropTypes from 'prop-types'

const LoginForm = ({handleSubmit, onChange, username, password}) => {
    return (
        <div>
            <h2>Log in</h2>
            <Form onSubmit={handleSubmit} className="ui form" compact="true" style={{width: "370px"}}>
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
                <button type="submit" className="ui basic button">Log in</button>
            </Form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm