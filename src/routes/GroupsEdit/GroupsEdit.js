// libs
import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { push } from 'react-router-redux'

// src
import {
    renderTextField,
    renderHiddenField,
    bindForm,
    required,
    minLength,
    getParamValue,
    getEntityByID,
    isLoadingGroups
} from '../../utils'
import { updateGroup } from '../../actions'
import { Article, Section } from '../../components'

const minLength2 = minLength(2)

export default 
    connect((state, ownProps) => {
        const id = getParamValue(ownProps, 'id')
        const entity = getEntityByID(state, 'groups', id)
        const isLoading = isLoadingGroups(state)
        const isAvailable = !isLoading && entity

        // console.log(`[UsersEdit/connect] id: ${id}, entity: `, entity)

        return { entity, isLoading, isAvailable }
    })(
    reduxForm({
        form: 'groupsUpdate'
    })(
    bindForm({
        onSubmit: (values, dispatch) =>
            dispatch(updateGroup(values))
                .then(() => dispatch(push(`/groups/${values.id}`)))
    })(
        class GroupsEdit extends React.Component {
            render() {
                const { onSubmit, renderSubmitButton, renderMessage } = this.props
                return (
                    <Article title="Edit Group" {...this.props}>
                        <Section half>
                            {
                                renderMessage()
                            }
                            <form onSubmit={ onSubmit }>
                                <Field name="id" component={renderHiddenField}/>

                                <Field
                                    name="name"
                                    label="Name"
                                    component={renderTextField}
                                    validate={[required, minLength2]}
                                    autoFocus
                                />

                                {
                                    renderSubmitButton({
                                        label: 'Update',
                                        labelWhenSubmitting: 'Updating ...'
                                    })
                                }
                            </form>
                        </Section>
                    </Article>
                )
            }
        }
    )))