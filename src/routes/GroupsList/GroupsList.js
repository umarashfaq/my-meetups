// libs
import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import R from 'ramda'
import Button from 'react-toolbox/lib/button/Button'
import Input from 'react-toolbox/lib/input/Input'

// src
import './GroupsList.css'
import Content from './Content'
import { deleteGroup, updateGroupSearchQuery } from '../../actions'
import { Article } from '../../components'
import { getGroupMemberCount } from '../../utils'

export default connect(state => {
    const groups = R.pipe(R.path(['entities', 'groups']), R.values)(state)
    const isLoading = R.path(['meta', 'isLoadingGroups'], state)
    const isAvailable = groups && groups.length > 0
    const query = R.path(['meta', 'groupSearchQuery'], state) || ''
    const filteredGroups = R.filter(R.pipe(R.values, R.any(v => v.indexOf(query) > -1)), groups)

    const counts = isAvailable ? getGroupMemberCount(state) : {}
    // console.log('counts: ', counts)

    return {
        groups,
        isLoading,
        isAvailable,
        counts,
        query,
        filteredGroups
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
    handleChangeQuery = query => {
        // this.setState({ query })
        const { dispatch } = this.props
        dispatch(updateGroupSearchQuery(query))
    }
    render() {
        const { query } = this.props

        return (
            <Article
                title="Groups"
                actions={
                    <div className="GroupsList-Actions">
                        <Input type="text" label="Search" name="search" className="GroupsList-Actions-Search" value={ query } onChange={this.handleChangeQuery} />
                        <Button label="New" accent raised className="GroupList-Button" onClick={this.handleClickNew}/>
                    </div>
                }
                {...this.props}>
                <Content
                    {...this.props}
                    onClickItem={this.handleClickItem}/>
            </Article>
        )
    }
})