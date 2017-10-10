// libs
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import R from 'ramda'

// src
import './GroupsList.css'
import Loading from './Loading'
import BlankSlate from './BlankSlate'
import Content from './Content'
import { deleteGroup } from '../../actions'

export default connect(state => {
    const groups = R.pipe(R.path(['entities', 'groups']), R.values)(state)
    const isLoading = R.path(['meta', 'isLoadingGroups'], state)
    const isAvailable = groups && groups.length > 0

    return {
        groups,
        isLoading,
        isAvailable
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
    render() {
        const { isLoading, isAvailable } = this.props

        return (
            <article>
                <h1>Groups</h1>
                <Link to="/groups/new">New</Link>
                {
                    isLoading    ? <Loading {...this.props}/>    :
                    !isAvailable ? <BlankSlate {...this.props}/> :
                                   <Content  {...this.props}
                                    onClickDelete={this.handleClickDelete}
                                    onClickDetails={this.handleClickDetails}/>
                }
            </article>
        )
    }
})