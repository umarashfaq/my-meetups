import * as ActionTypes from '../../actions'

export default function(state = {}, action) {
    const { type, payload } = action

    switch( type ) {
        case ActionTypes.USERS_RECEIVE: {
            const { id } = payload
            return {
                ...state,
                [id]: payload
            }
        }
        default: {
            return state
        }
    }
}