// libs
import React from 'react'
import Button from 'react-toolbox/lib/button/Button'
import R from 'ramda'
// import get from 'lodash/get'
// import has from 'lodash/has'

// src
import { hasPropChanged } from './utils'

/**
 * A higher order function that injects some additional params to a form component
 * @param {Object} param0 
 */
export default (options) => (WrappedComponent) => {
  const { onSubmit } = options
  const getDefaultState = () => ({
    error: false,
    errorMessage: ''
  })

  return class BoundForm extends React.Component {
    state = getDefaultState();

    constructor(props) {
        super(props)

        const { handleSubmit } = props
        this.handleSubmit = handleSubmit(this.wrapSubmit( onSubmit ))
    }
    componentDidMount() {
        const entity = R.path(['entity'], this.props)
        
        if ( entity ) {
            this.handleChangeEntity(entity)
        }
    }
    componentWillReceiveProps(nextProps) {
        if ( hasPropChanged('entity', this.props, nextProps) ) {
          const entity = R.path(['entity'], nextProps)
          this.handleChangeEntity(entity)
        }
    }
    /**
     * Will only be called when two conditions are met:
     * 1. Form is being used for updating an entity
     * 2. __status__ of that entity has changed
     * 
     */
    handleChangeEntity = entity => {
      // console.log(`[bindForm/handleChangeEntity] Invoking with entity: `, entity)
        if ( entity ) {
            const { initialize } = this.props
            initialize(entity)
        }
    }
    wrapSubmit = ( submit ) => {
      return (...args) => {
        this.setState(getDefaultState())

        return Promise.resolve(submit(...args))
          .then(action => {
            if ( !action || typeof action !== 'object') {
              /*
              console && console.error && console.error(
                'nothing returned in then'
              )
              */

              return
            }
            const {error, payload} = action

            if (error) {
              this.setState({
                error: true,
                errorMessage: payload.errorMessage
              })

              throw new Error(`An error occurred while submitting the form: ${payload.errorMessage}`)
            }

            return action
          })
      }
    }
    renderSubmitButton = ({label, labelWhenSubmitting}) => {
      const { submitting } = this.props

      return (
        <div>
          <Button
            label={submitting ? labelWhenSubmitting : label}
            accent
            raised
            onClick={this.handleSubmit}
            disabled={submitting}/>
          <input type="submit" style={{display: 'none'}}/>
        </div>
      )
    }
    renderMessage = () => {
      const { error, errorMessage } = this.state

      return error ? <div style={{color: 'red'}}>{ errorMessage }</div> : <span></span>
    }
    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          onSubmit={this.handleSubmit}
          renderSubmitButton={this.renderSubmitButton}
          renderMessage={this.renderMessage}/>
      )
    }
  }
}

