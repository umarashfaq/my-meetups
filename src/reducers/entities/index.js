import { combineReducers } from 'redux'
import users from './users'
import groups from './groups'

export default combineReducers({
    users, groups
})