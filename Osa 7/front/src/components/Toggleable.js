import React from 'react'
import {Button} from 'semantic-ui-react'
import PropTypes from 'prop-types'

class Toggleable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    toggleVisibility = () => {
        this.setState({
            visible: !this.state.visible
        })
    }

    render() {
        const hideWhenVisible = {
            display: this.state.visible
                ? 'none'
                : ''
        }
        const showWhenVisible = {
            display: this.state.visible
                ? ''
                : 'none'
        }

        return (
            <div>
                <div style={hideWhenVisible}>
                    <Button onClick={this.toggleVisibility} className="ui primary button" size="tiny">{this.props.buttonLabel} a new blog</Button>
                </div>
                <div style={showWhenVisible}>
                    {this.props.children}
                    <Button onClick={this.toggleVisibility} className="ui secondary button" size="tiny">Cancel</Button>
                </div>
            </div>
        )
    }
}

Toggleable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Toggleable