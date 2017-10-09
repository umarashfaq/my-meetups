import fire from '../../fire'

export const createGroup = values => () => fire.database().ref('groups').push(values)

export const GROUPS_RECEIVE = 'GROUPS_RECEIVE'
export const receiveGroup = payload => ({
    type: GROUPS_RECEIVE,
    payload
})