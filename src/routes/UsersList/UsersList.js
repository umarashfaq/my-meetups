// libs
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import R from 'ramda'

// src
import './UsersList.css'
import Loading from './Loading'
import BlankSlate from './BlankSlate'
import Content from './Content'
import { isLoadingUsers } from '../../utils'

export default connect(state => {
    const users = R.pipe(R.path(['entities', 'users']), R.values)(state)
    const isLoading = isLoadingUsers(state)
    const isAvailable = users && users.length > 0

    return {
        users,
        isLoading,
        isAvailable
    }
})(class UsersList extends React.Component {
    handleClickDetails = id => {
        const { dispatch } = this.props
        dispatch(push(`/users/${id}`))
    }
    handleClickEdit = id => {
        const { dispatch } = this.props
        dispatch(push(`/users/${id}/edit`))
    }
    render() {
        const { isLoading, isAvailable } = this.props

        return (
            <article>
                <h1>Users</h1>
                <Link to="/users/new">New</Link>
                {
                    isLoading    ? <Loading {...this.props}/>    :
                    !isAvailable ? <BlankSlate {...this.props}/> :
                                   <Content  {...this.props}
                                        onClickEdit={this.handleClickEdit}
                                        onClickDetails={this.handleClickDetails}/>
                }
            </article>
        )
    }
})