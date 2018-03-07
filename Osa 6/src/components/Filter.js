import React from 'react'
import {connect} from 'react-redux'
import {filterChange} from '../reducers/filterReducer'

class Filter extends React.Component {
    handleChange = (e) => {
        e.preventDefault()
        this
            .props
            .filterChange(e.target.value)
    }

    render() {
        const style = {
            marginBottom: 10
        }

        return (
            <div style={style}>
                <input onChange={this.handleChange} placeholder="Filter"/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {filter: state.filter}
}

const mapDispatchToProps = {
    filterChange
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default ConnectedFilter