// libs
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import R from 'ramda'
import Button from 'react-toolbox/lib/button/Button'

// src
import './GroupsList.css'
import Content from './Content'
import { deleteGroup } from '../../actions'
import { Breadcrumbs, Article } from '../../components'
import { getGroupMemberCount } from '../../utils'

export default connect(state => {
    const groups = R.pipe(R.path(['entities', 'groups']), R.values)(state)
    const isLoading = R.path(['meta', 'isLoadingGroups'], state)
    const isAvailable = groups && groups.length > 0

    const counts = isAvailable ? getGroupMemberCount(state) : {}
    // console.log('counts: ', counts)

    return {
        groups,
        isLoading,
        isAvailable,
        counts
    }
})(class GroupsList extends React.Component {
    handleClickDelete = groupID => {
        if ( !window.confirm(`Sure to delete?`) ) {
            return
        }

        const { dispatch } = this.props
        dispatch(deleteGroup(groupID))
    }
    handleClickDetails = groupID => {
        const { dispatch } = this.props
        dispatch(push(`/groups/${groupID}`))
    }
    handleClickNew = () => {
        const { dispatch } = this.props
        dispatch(push(`/groups/new`))
    }
    handleClickItem = groupID => {
        const { dispatch } = this.props
        dispatch(push(`/groups/${groupID}`))
    }
    render() {
        const { isLoading, isAvailable, location } = this.props

        return (
            <Article title="Groups" actions={<Button label="New" accent raised className="GroupList-Button" onClick={this.handleClickNew}/>} {...this.props}>
                <Content
                    {...this.props}
                    onClickItem={this.handleClickItem}/>
            </Article>
        )
    }
})