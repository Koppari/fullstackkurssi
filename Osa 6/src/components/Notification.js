import React from 'react'
import {connect} from 'react-redux'

class Notification extends React.Component {
    render() {
        const notification = () => {
            if (this.props.notification != null) 
                return (
                    <div>
                        {this.props.notification}
                    </div>
                )
        }

        return (
            <div>
                {notification()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {notification: state.notification}
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification