import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import { getParamValue, getEntityByID, isLoadingUsers, denormalizeMultiSelect } from '../../utils'
import Loading from './Loading'
import BlankSlate from './BlankSlate'
import Content from './Content'

export default connect((state, ownProps) => {
    const id = getParamValue(ownProps, 'id')
    const entity = getEntityByID(state, 'users', id)
    const isLoading = isLoadingUsers(state)
    const isAvailable = !isLoading && entity
    const groups = isAvailable ? R.map(id => R.path(['entities', 'groups', id], state), denormalizeMultiSelect(entity.groups)) : []

    // console.log(`[UsersEdit/connect] id: ${id}, entity: `, entity)

    return { entity, isLoading, isAvailable, groups }
})(class UsersDetails extends React.Component {
    render() {
        const { isLoading, isAvailable } = this.props

        return (
            <article>
                <h1>User Details</h1>
                {
                    isLoading    ? <Loading    {...this.props}/> :
                    !isAvailable ? <BlankSlate {...this.props}/> :
                                   <Content    {...this.props}/>
                }
            </article>
        )
    }
})