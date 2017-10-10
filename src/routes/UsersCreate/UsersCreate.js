// libs
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Button from 'react-toolbox/lib/button/Button'

// src
import { minLength, bindForm } from '../../utils'
import { createUser } from '../../actions'
import Loading from './Loading'
import BlankSlate from './BlankSlate'
import Content from './Content'

const minLength2 = minLength(2)

export default 
    reduxForm({
        form: 'usersCreate'
    })(
    bindForm({
        onSubmit: (values, dispatch) => {
            // console.log('Submitting .... ', values)
            return dispatch(createUser(values))
        }
    })(
        class UsersCreate extends React.Component {
            render() {
                const { isLoading, isAvailable } = this.props
                return (
                    <article>
                        <h1>Create User</h1>
                        <Content    {...this.props}/>
                    </article>
                )
            }
        }
    ))