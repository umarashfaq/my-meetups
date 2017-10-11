// libs
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import Button from 'react-toolbox/lib/button/Button'

// src
import { updateUser } from '../../actions'
import { isLoadingUsers, bindForm, getParamValue, getEntityByID } from '../../utils'
import Loading from './Loading'
import BlankSlate from './BlankSlate'
import Content from './Content'
import { Breadcrumbs } from '../../components'

export default 
    connect((state, ownProps) => {
        const id = getParamValue(ownProps, 'id')
        const entity = getEntityByID(state, 'users', id)
        const isLoading = isLoadingUsers(state)
        const isAvailable = !isLoading && entity

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
                const { isLoading, isAvailable, location } = this.props
                return (
                    <article>
                        <Breadcrumbs pathname={location.pathname}/>
                        <h1>Edit</h1>
                        {
                            isLoading    ? <Loading    {...this.props}/> :
                            !isAvailable ? <BlankSlate {...this.props}/> :
                                           <Content    {...this.props}/>
                        }
                    </article>
                )
            }
        }
    )))