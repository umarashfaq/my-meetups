import fire from '../../fire'

export const createGroup = values => () => fire.database().ref('groups').push(values)
export const deleteGroup = id => () => fire.database().ref('groups').child(id).remove()

export const GROUPS_HANDLE_CREATE = 'GROUPS_HANDLE_CREATE'
export const handleGroupCreate = payload => ({
    type: GROUPS_HANDLE_CREATE,
    payload
})

export const GROUPS_HANDLE_DELETE = 'GROUPS_HANDLE_DELETE'
export const handleGroupDelete = payload => ({
    type: GROUPS_HANDLE_DELETE,
    payload
})