import * as ActionTypes from '../../actions'

export default function(state = {}, action) {
    const { type, payload } = action

    switch( type ) {
        case ActionTypes.USERS_HANDLE_CREATE: 
        case ActionTypes.USERS_HANDLE_UPDATE: {
            const { id } = payload
            return {
                ...state,
                [id]: payload
            }
        }
        case ActionTypes.USERS_HANDLE_DELETE: {
            const { id } = payload
            const nextState = { ...state }
            delete nextState[id]

            return nextState
        }
        default: {
            return state
        }
    }
}