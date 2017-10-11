// libs
import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import R from 'ramda'
import Button from 'react-toolbox/lib/button/Button'
import Input from 'react-toolbox/lib/input/Input'

// src
import './UsersList.css'
import Content from './Content'
import { isLoadingUsers } from '../../utils'
import { Article } from '../../components'
import { updateUserSearchQuery } from '../../actions'

export default connect(state => {
    const users = R.pipe(R.path(['entities', 'users']), R.values)(state)
    const isLoading = isLoadingUsers(state)
    const isAvailable = users && users.length > 0
    const query = R.path(['meta', 'userSearchQuery'], state) || ''
    const filteredUsers = R.filter(R.pipe(R.values, R.any(v => v.indexOf(query) > -1)), users)

    return {
        users,
        isLoading,
        isAvailable,
        query,
        filteredUsers
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
    handleChangeQuery = query => {
        // this.setState({ query })
        const { dispatch } = this.props
        dispatch(updateUserSearchQuery(query))
    }
    render() {
        const { query } = this.props
        
        return (
            <Article
                title="Users"
                actions={
                    <div className="UsersList-Actions">
                        <Input type="text" label="Search" name="search" className="UsersList-Actions-Search" value={ query } onChange={this.handleChangeQuery} />
                        <Button label="New" accent raised className="UserList-Button" onClick={this.handleClickNew}/>
                    </div>
                }
                {...this.props}>
                <Content
                    {...this.props}
                    onClickEdit={this.handleClickEdit}
                    onClickDetails={this.handleClickDetails}/>
            </Article>
        )
    }
})