// libs
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

// src
import entities from './entities'
import * as ActionTypes from '../actions'

function meta(state = {}, action) {
  const { type, payload } = action
  
  switch( type ) {
    case ActionTypes.META_USERS_SET_LOADING_STATE: {
      return {...state, isLoadingUsers: payload}
    }
    case ActionTypes.META_GROUPS_SET_LOADING_STATE: {
      return {...state, isLoadingGroups: payload}
    }
    case ActionTypes.META_USERS_SEARCH_QUERY: {
      return {...state, userSearchQuery: payload}
    }
    case ActionTypes.META_GROUPS_SEARCH_QUERY: {
      return {...state, groupSearchQuery: payload}
    }
    default: {
      return state
    }
  }
}

export default combineReducers({
  meta,
  entities,
  routing: routerReducer,
  form: formReducer
})