import R from 'ramda'

/**
 * 
 * @param {string} key 
 * @param {Object} thisProps 
 * @param {Object} nextProps 
 */
export const hasPropChanged = (key, thisProps, nextProps) => !R.equals(thisProps[key], nextProps[key])

export const isLoadingUsers = state => R.path(['meta', 'isLoadingUsers'], state)
export const isLoadingGroups = state => R.path(['meta', 'isLoadingGroups'], state)

export const getEntityByID = (state, entityKey, id) => R.path(['entities', entityKey, id], state)
export const getParamValue = (props, paramKey) => R.path(['match', 'params', paramKey], props)

// R.pipe(R.path(['entities', 'users']), R.values, R.filter(u => u.groups && u.groups.indexOf(id) > -1))(state)

/**
 * Call this function with `state` as param
 */
export const getGroupMemberCount =
    R.pipe(
        R.path(['entities', 'users']),
        R.values,
        R.map(u => u.groups),
        R.reject(R.equals(undefined)),
        R.reduce((list, item) => [...list, ...item.split(',')], []),
        R.countBy(a => a)
    )

export const isGroupDeletable = (state, group) =>
    (getGroupMemberCount(state)[group.id] || 0) < 1