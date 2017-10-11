// libs
import React from 'react'
import { push } from 'react-router-redux'
import { Field, reduxForm } from 'redux-form'
import Button from 'react-toolbox/lib/button/Button'

// src
import { minLength, bindForm } from '../../utils'
import { createUser } from '../../actions'
import Loading from './Loading'
import BlankSlate from './BlankSlate'
import Content from './Content'
import './UsersCreate.css'
import { Breadcrumbs } from '../../components'

const minLength2 = minLength(2)

export default 
    reduxForm({
        form: 'usersCreate'
    })(
    bindForm({
        onSubmit: (values, dispatch) => {
            // console.log('Submitting .... ', values)
            return dispatch(createUser(values))
                .then(() => dispatch(push(`/users`)))
        }
    })(
        class UsersCreate extends React.Component {
            render() {
                const { isLoading, isAvailable, location } = this.props
                return (
                    <article>
                        <Breadcrumbs pathname={location.pathname}/>
                        <h1>Create User</h1>
                        <Content    {...this.props}/>
                    </article>
                )
            }
        }
    ))