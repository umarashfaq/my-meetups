// libs
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Button from 'react-toolbox/lib/button/Button'

// src
import { updateUser } from '../../actions'
import { isLoadingUsers, bindForm, getParamValue, getEntityByID } from '../../utils'
import Loading from './Loading'
import BlankSlate from './BlankSlate'
import Content from './Content'

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
        onSubmit: (values, dispatch) => {
            console.log('Submitting .... ', values)
            return dispatch(updateUser(values))
        }
    })(
        class UsersEdit extends React.Component {
            render() {
                const { isLoading, isAvailable } = this.props
                return (
                    <article>
                        <h1>Update User</h1>
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