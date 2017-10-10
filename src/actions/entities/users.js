import fire from '../../fire'

export const createUser = values => () => fire.database().ref('users').push(values)
export const deleteUser = id => () => fire.database().ref('users').child(id).remove()
export const updateUser = values => () => fire.database().ref('users').child(values.id).set(values)

export const USERS_HANDLE_CREATE = 'USERS_HANDLE_CREATE'
export const handleUserCreate = payload => ({
    type: USERS_HANDLE_CREATE,
    payload
})

export const USERS_HANDLE_DELETE = 'USERS_HANDLE_DELETE'
export const handleUserDelete = payload => ({
    type: USERS_HANDLE_DELETE,
    payload
})

export const USERS_HANDLE_UPDATE = 'USERS_HANDLE_UPDATE'
export const handleUserUpdate = payload => ({
    type: USERS_HANDLE_UPDATE,
    payload
})