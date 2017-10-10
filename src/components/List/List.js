import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export default connect((state, ownProps) => {
    return {}
})(class ListItem extends React.Component {
    static propTypes = {
        entity: PropTypes.string.isRequired
    }

    render() {
        return <ul></ul>
    }
})