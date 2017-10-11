// libs
import React from 'react'
import { Field } from 'redux-form'
import Button from 'react-toolbox/lib/button/Button'
import Card from 'react-toolbox/lib/card/Card'

// src
import { Section } from '../../components'
import {
    renderTextField,
    renderHiddenField,
    renderGroupsField,

    normalizeMultiSelect,

    bindForm,
    required,
    minLength,
    email
} from '../../utils'

const minLength2 = minLength(2)

const Content = ({ onSubmit, renderSubmitButton, renderMessage, sourceGroup }) => (
    <div className="UsersCreate-Content">
        <Section half>
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

                <Field
                    name="groups"
                    label="Groups"
                    component={renderGroupsField}
                    normalize={normalizeMultiSelect}
                    validate={[required]}
                />

                {
                    renderSubmitButton({
                        label: 'Create',
                        labelWhenSubmitting: 'Creating ...'
                    })
                }
            </form>
        </Section>
    </div>
)

export default Content