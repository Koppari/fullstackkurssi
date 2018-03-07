import React from 'react'
import PropTypes from 'prop-types'
import {filterChange} from '../reducers/filterReducer'

class Filter extends React.Component {
    componentDidMount() {
        const {store} = this.context
        this.unsubscribe = store.subscribe(() => this.forceUpdate())
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    handleChange = (e) => {
        e.preventDefault()
        this
            .context
            .store
            .dispatch(filterChange(e.target.value))   
    }

    render() {
        const style = {
            marginBottom: 10
        }

        return (
            <div style={style}>
                Filter <input onChange={this.handleChange}/>
            </div>
        )
    }
}

Filter.contextTypes = {
    store: PropTypes.object
}

export default Filter