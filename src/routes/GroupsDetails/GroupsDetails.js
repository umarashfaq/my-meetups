import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import R from 'ramda'

import {
    getParamValue,
    getEntityByID,
    isLoadingGroups,
    denormalizeMultiSelect,
    isGroupDeletable
} from '../../utils'
import Content from './Content'
import { Article } from '../../components'
import { deleteGroup } from '../../actions'
import './GroupsDetails.css'

export default connect((state, ownProps) => {
    const id = getParamValue(ownProps, 'id')
    const entity = getEntityByID(state, 'groups', id)
    const isLoading = isLoadingGroups(state)
    const isAvailable = !!(!isLoading && entity)
    // const groups = isAvailable ? R.map(id => R.path(['entities', 'groups', id], state), denormalizeMultiSelect(entity.groups)) : []
    const members = isAvailable ? R.pipe(R.path(['entities', 'users']), R.values, R.filter(u => u.groups && u.groups.indexOf(id) > -1))(state) : []
    const isDeletable = isAvailable && isGroupDeletable(state, entity)
    // console.log(`[UsersEdit/connect] id: ${id}, entity: `, entity)

    return { entity, isLoading, isAvailable, members, isDeletable }
})(class GroupDetails extends React.Component {
    handleClickDelete = e => {
        e.preventDefault()
        e.stopPropagation()

        const { entity, dispatch, isDeletable } = this.props

        if ( !isDeletable ) {
            alert(`This group is not deletable, since it has some members. Please revoke all memberships before deleting this group.`)
            return
        }

        if ( !window.confirm('Sure to delete?') ) {
            return
        }

        dispatch(deleteGroup(entity.id))
            .then(dispatch(push(`/groups`)))
    }
    render() {
        return (
            <Article title="Group Details" {...this.props}>
                <Content {...this.props} onClickDelete={this.handleClickDelete}/>
            </Article>
        )
    }
})