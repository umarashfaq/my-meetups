// libs
import React from 'react'
import { push } from 'react-router-redux'
import { reduxForm } from 'redux-form'

// src
import { bindForm } from '../../utils'
import { createUser } from '../../actions'
import Content from './Content'
import './UsersCreate.css'
import { Article } from '../../components'

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
                return (
                    <Article title="Create User" {...this.props}>
                        <Content {...this.props}/>
                    </Article>
                )
            }
        }
    ))