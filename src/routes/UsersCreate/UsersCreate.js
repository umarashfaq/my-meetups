// libs
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Button from 'react-toolbox/lib/button/Button'

// src
import { renderTextField, bindForm, required, minLength, email } from '../../utils'
import { createUser } from '../../actions'

const minLength2 = minLength(2)

export default 
    reduxForm({
        form: 'usersCreate'
    })(
    bindForm({
        onSubmit: (values, dispatch) => {
            console.log('Submitting .... ', values)
            return dispatch(createUser(values))
        }
    })(
        class UsersCreate extends React.Component {
            render() {
                const { onSubmit, renderSubmitButton, renderMessage } = this.props
                return (
                    <article>
                        <h1>New User</h1>
                        {
                            renderMessage()
                        }
                        <form onSubmit={ onSubmit }>
                            <Field
                                name="firstName"
                                label="First Name"
                                component={renderTextField}
                                validate={[required, minLength2]}
                                autoFocus
                            />

                            <Field
                                name="lastName"
                                label="Last Name"
                                component={renderTextField}
                                validate={[required, minLength2]}
                            />

                            <Field
                                name="email"
                                label="Email"
                                component={renderTextField}
                                type="email"
                                validate={[required, email]}
                            />

                            {
                                renderSubmitButton({
                                    label: 'Create',
                                    labelWhenSubmitting: 'Creating ...'
                                })
                            }
                        </form>
                    </article>
                )
            }
        }
    ))