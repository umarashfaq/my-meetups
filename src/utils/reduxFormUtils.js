// libs
import React from 'react'
import Input from 'react-toolbox/lib/input/Input'


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
