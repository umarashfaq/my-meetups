import React from 'react'
import Button from 'react-toolbox/lib/button/Button'
import { Field } from 'redux-form'

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
    <section>
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
    </section>
)

export default Content