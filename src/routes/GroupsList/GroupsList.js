// libs
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import R from 'ramda'

// src
import './GroupsList.css'
import Loading from './Loading'
import BlankSlate from './BlankSlate'
import Content from './Content'

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
    render() {
        const { isLoading, isAvailable } = this.props

        return (
            <article>
                <h1>Groups</h1>
                <Link to="/groups/new">New</Link>
                {
                    isLoading    ? <Loading {...this.props}/>    :
                    !isAvailable ? <BlankSlate {...this.props}/> :
                                   <Content  {...this.props}/>
                }
            </article>
        )
    }
})