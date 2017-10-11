// libs
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { push } from 'react-router-redux'

// src
import { renderTextField, bindForm, required, minLength } from '../../utils'
import { createGroup } from '../../actions'
import { Article, Section } from '../../components'

const minLength2 = minLength(2)

export default 
    reduxForm({
        form: 'groupsCreate'
    })(
    bindForm({
        onSubmit: (values, dispatch) => {
            console.log('Submitting .... ', values)
            return dispatch(createGroup(values))
                .then(() => dispatch(push('/groups')))
        }
    })(
        class GroupsCreate extends React.Component {
            render() {
                const { onSubmit, renderSubmitButton, renderMessage } = this.props
                return (
                    <Article title="New Group" {...this.props}>
                        <Section half>
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
                        </Section>
                    </Article>
                )
            }
        }
    ))