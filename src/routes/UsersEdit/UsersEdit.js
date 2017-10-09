import React from 'react'
import { Field } from 'redux-form'
import { renderTextField } from '../../utils'

export default class UsersEdit extends React.Component {
    render() {
        return (
            <article>
                <h1>Edit User</h1>
                <form>
                    <Field
                        name="name"
                        label="Name"
                        component={renderTextField}
                        autoFocus
                    />
                </form>
            </article>
        )
    }
}