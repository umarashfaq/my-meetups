// libs
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import R from 'ramda'
import Button from 'react-toolbox/lib/button/Button'

// src
import './UsersList.css'
import Content from './Content'
import { isLoadingUsers } from '../../utils'
import { Breadcrumbs, Page } from '../../components'

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
    handleClickNew = () => {
        const { dispatch } = this.props
        dispatch(push(`/users/new`))
    }
    render() {
        const { isLoading, isAvailable, location } = this.props

        return (
            <Page title="Users" actions={<Button label="New" accent raised className="UserList-Button" onClick={this.handleClickNew}/>} {...this.props}>
                <Content  {...this.props}
                    onClickEdit={this.handleClickEdit}
                    onClickDetails={this.handleClickDetails}/>
            </Page>
        )
    }
})