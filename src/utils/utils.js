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