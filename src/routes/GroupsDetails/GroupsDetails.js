import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import { getParamValue, getEntityByID, isLoadingGroups, denormalizeMultiSelect } from '../../utils'
import Loading from './Loading'
import BlankSlate from './BlankSlate'
import Content from './Content'

export default connect((state, ownProps) => {
    const id = getParamValue(ownProps, 'id')
    const entity = getEntityByID(state, 'groups', id)
    const isLoading = isLoadingGroups(state)
    const isAvailable = !isLoading && entity
    // const groups = isAvailable ? R.map(id => R.path(['entities', 'groups', id], state), denormalizeMultiSelect(entity.groups)) : []
    const members = isAvailable ? R.pipe(R.path(['entities', 'users']), R.values, R.filter(u => u.groups && u.groups.indexOf(id) > -1))(state) : []

    // console.log(`[UsersEdit/connect] id: ${id}, entity: `, entity)

    return { entity, isLoading, isAvailable, members }
})(class GroupDetails extends React.Component {
    render() {
        const { isLoading, isAvailable } = this.props

        return (
            <article>
                <h1>Group Details</h1>
                {
                    isLoading    ? <Loading    {...this.props}/> :
                    !isAvailable ? <BlankSlate {...this.props}/> :
                                   <Content    {...this.props}/>
                }
            </article>
        )
    }
})