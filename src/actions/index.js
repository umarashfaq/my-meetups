export * from './entities'

export const META_USERS_SET_LOADING_STATE = 'META_USERS_SET_LOADING_STATE'
export const setLoadingStateForInitialUsers = payload => ({
    type: META_USERS_SET_LOADING_STATE,
    payload
})

export const META_GROUPS_SET_LOADING_STATE = 'META_GROUPS_SET_LOADING_STATE'
export const setLoadingStateForInitialGroups = payload => ({
    type: META_GROUPS_SET_LOADING_STATE,
    payload
})

export const META_USERS_SEARCH_QUERY = 'META_USERS_SEARCH_QUERY'
export const updateUserSearchQuery = payload => ({
    type: META_USERS_SEARCH_QUERY,
    payload
})

export const META_GROUPS_SEARCH_QUERY = 'META_GROUPS_SEARCH_QUERY'
export const updateGroupSearchQuery = payload => ({
    type: META_GROUPS_SEARCH_QUERY,
    payload
})