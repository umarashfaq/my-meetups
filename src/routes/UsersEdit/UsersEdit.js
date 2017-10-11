// libs
import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { push } from 'react-router-redux'

// src
import { updateUser } from '../../actions'
import { isLoadingUsers, bindForm, getParamValue, getEntityByID } from '../../utils'
import Content from './Content'
import { Article } from '../../components'

export default 
    connect((state, ownProps) => {
        const id = getParamValue(ownProps, 'id')
        const entity = getEntityByID(state, 'users', id)
        const isLoading = isLoadingUsers(state)
        const isAvailable = !!(!isLoading && entity)

        // console.log(`[UsersEdit/connect] id: ${id}, entity: `, entity)

        return { entity, isLoading, isAvailable }
    })(
    reduxForm({
        form: 'usersUpdate'
    })(
    bindForm({
        onSubmit: (values, dispatch) =>
            dispatch(updateUser(values))
                .then(() => dispatch(push(`/users/${values.id}`)))
    })(
        class UsersEdit extends React.Component {
            render() {
                return (
                    <Article title="Edit" {...this.props}>
                        <Content {...this.props}/>
                    </Article>
                )
            }
        }
    )))