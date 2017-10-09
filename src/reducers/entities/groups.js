import * as ActionTypes from '../../actions'

export default function(state = {}, action) {
    const { type, payload } = action

    switch( type ) {
        case ActionTypes.GROUPS_HANDLE_CREATE: {
            const { id } = payload
            return {
                ...state,
                [id]: payload
            }
        }
        case ActionTypes.GROUPS_HANDLE_DELETE: {
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