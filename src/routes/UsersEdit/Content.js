import React from 'react'
import { Field } from 'redux-form'

import { Section } from '../../components'
import {
    renderTextField,
    renderHiddenField,
    renderGroupsField,

    normalizeMultiSelect,
    required,
    minLength,
    email
} from '../../utils'

const minLength2 = minLength(2)

const Content = ({ onSubmit, renderSubmitButton, renderMessage, sourceGroup }) => (
    <Section half>
        {
            renderMessage()
        }
        <form onSubmit={ onSubmit }>
            <Field name="id" component={renderHiddenField}/>

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
                    label: 'Update',
                    labelWhenSubmitting: 'Updating ...'
                })
            }
        </form>
    </Section>
)

export default Content