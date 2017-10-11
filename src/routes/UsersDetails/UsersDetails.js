// libs
import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import R from 'ramda'

// src
import './UserDetails.css'
import { getParamValue, getEntityByID, isLoadingUsers, denormalizeMultiSelect } from '../../utils'
import Content from './Content'
import { Article } from '../../components'
import { deleteUser } from '../../actions'

export default connect((state, ownProps) => {
    const id = getParamValue(ownProps, 'id')
    const entity = getEntityByID(state, 'users', id)
    const isLoading = isLoadingUsers(state)
    const isAvailable = !!(!isLoading && entity)
    const groups = isAvailable ? R.map(id => R.path(['entities', 'groups', id], state), denormalizeMultiSelect(entity.groups)) : []

    // console.log(`[UsersEdit/connect] id: ${id}, entity: `, entity)

    return { entity, isLoading, isAvailable, groups }
})(class UsersDetails extends React.Component {
    handleClickDelete = e => {
        e.stopPropagation()
        e.preventDefault()

        if ( !window.confirm('Sure to delete?') ) {
            return
        }

        const { dispatch, entity } = this.props

        dispatch(deleteUser(entity.id))
            .then(dispatch(push(`/users`)))
    }
    render() {
        const { isLoading, isAvailable, location } = this.props

        return (
            <Article title="User Details" {...this.props}>
                <Content {...this.props} onClickDelete={this.handleClickDelete}/>
            </Article>
        )
    }
})