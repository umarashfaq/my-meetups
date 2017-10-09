// libs
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Button from 'react-toolbox/lib/button/Button'

// src
import { renderTextField, bindForm, required, minLength, email } from '../../utils'
import { createGroup } from '../../actions'

const minLength2 = minLength(2)

export default 
    reduxForm({
        form: 'groupsCreate'
    })(
    bindForm({
        onSubmit: (values, dispatch) => {
            console.log('Submitting .... ', values)
            return dispatch(createGroup(values))
        }
    })(
        class GroupsCreate extends React.Component {
            render() {
                const { onSubmit, renderSubmitButton, renderMessage } = this.props
                return (
                    <article>
                        <h1>New Group</h1>
                        {
                            renderMessage()
                        }
                        <form onSubmit={ onSubmit }>
                            <Field
                                name="name"
                                label="Name"
                                component={renderTextField}
                                validate={[required, minLength2]}
                                autoFocus
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