// libs
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import R from 'ramda'

// src
import './UsersList.css'
import Loading from './Loading'
import BlankSlate from './BlankSlate'
import Content from './Content'

export default connect(state => {
    const users = R.pipe(R.path(['entities', 'users']), R.values)(state)
    const isLoading = R.path(['meta', 'isLoadingUsers'], state)
    const isAvailable = users && users.length > 0

    return {
        users,
        isLoading,
        isAvailable
    }
})(class UsersList extends React.Component {
    render() {
        const { isLoading, isAvailable } = this.props

        return (
            <article>
                <h1>Users</h1>
                <Link to="/users/new">New</Link>
                {
                    isLoading    ? <Loading {...this.props}/>    :
                    !isAvailable ? <BlankSlate {...this.props}/> :
                                   <Content  {...this.props}/>
                }
            </article>
        )
    }
})