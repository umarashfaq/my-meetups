import fire from '../../fire'

export const createUser = values => () => fire.database().ref('users').push(values)

export const USERS_RECEIVE = 'USERS_RECEIVE'
export const receiveUser = payload => ({
    type: USERS_RECEIVE,
    payload
})