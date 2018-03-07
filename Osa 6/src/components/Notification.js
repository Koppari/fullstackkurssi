import React from 'react'
import PropTypes from 'prop-types'

class Notification extends React.Component {
    componentDidMount() {
        const {store} = this.context
        this.unsubscribe = store.subscribe(() => this.forceUpdate())
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        const notification = () => {
            if (this.context.store.getState().notification != null) 
                return (
                    <div>
                        {this
                            .context
                            .store
                            .getState()
                            .notification}
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

const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
}

Notification.contextTypes = {
    store: PropTypes.object
}

export default Notification