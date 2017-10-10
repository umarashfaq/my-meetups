// libs
import R from 'ramda'
import React from 'react'
import Input from 'react-toolbox/lib/input/Input'
import Autocomplete from 'react-toolbox/lib/autocomplete/Autocomplete'
import { connect } from 'react-redux'

import { isLoadingGroups } from './utils'

export const renderTextField = ({ input, label, type = 'text', meta: { touched, error }, ...custom }) => (
  <Input
    label={label}
    type={type}
    floating
    error={touched && error}
    {...input}
    {...custom}
    onChange={(value, event) => input.onChange(event, value, input.value)}
  />
)

export const renderHiddenField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <input
    type="hidden"
    {...input}
    {...custom}
  />
)

export const renderAutocompleteField = ({ input, label, meta: { touched, error }, ...custom }) => {
  // console.log(`[reduxFormUtils/renderMultiSelect] value: `, input.value)
  return (
    <Autocomplete
      direction="down"
      selectedPosition="below"
      label={label}
      error={touched && error}
      {...input}
      {...custom}
      value={denormalizeMultiSelect(input.value)}
      onBlur={() => {}}
    />
  )
}

export const renderGroupsField =
  connect(state => {
    const sourceItems = R.pipe(R.path(['entities', 'groups']), R.map(({name}) => name))(state)
    const isLoading = isLoadingGroups(state)
    const isAvailable = !R.pipe(R.keys, R.isEmpty)(sourceItems)

    return { sourceItems, isLoading, isAvailable }
  })(class GroupsField extends React.Component {
    render() {
      const { isLoading, isAvailable, sourceItems, children, ...rest } = this.props
      return (
        <div>
          {
            isLoading ? <p>Loading ...</p> :
            !isAvailable ? <p>Groups not available</p> :
              renderAutocompleteField(Object.assign({
                source: sourceItems,
                multiple: true
              }, rest))
          }
        </div>
      )
    }
  })

export const normalizeMultiSelect = value => {
  // console.log(`[reduxFormUtils/normalizeMultiSelect] value: `, value)
  return value.join ? value.join(',') : value
}

export const denormalizeMultiSelect = value => {
  const next = value && value.split ? value.split(',') : []
  // console.log(`[reduxFormUtils/denormalizeMultiSelect] value: `, next)
  return next
}

// copied from here:
// https://redux-form.com/6.6.1/examples/fieldlevelvalidation/
export const required = value => value ? undefined : 'Required'
export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
export const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
export const minValue18 = minValue(18)
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
export const aol = value =>
  value && /.+@aol\.com/.test(value) ?
  'Really? You still use AOL for your email?' : undefined
