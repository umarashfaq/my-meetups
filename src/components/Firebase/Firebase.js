import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

// src
import {
    handleUserCreate,
    handleUserDelete,
    handleUserUpdate,
    handleGroupCreate,
    handleGroupDelete,
    handleGroupUpdate,
    setLoadingStateForInitialUsers,
    setLoadingStateForInitialGroups
} from '../../actions'
import fire from '../../fire'

const entitySessions = {}

const startListening = (entityKey, { onInitialLoadingComplete, onReceiveEntity, onRemoveEntity, onUpdateEntity }) => {
    if ( entitySessions[entityKey] ) {
        // don't listen twice
        return
    }

    const session = entitySessions[entityKey] = {
        ref: fire.database().ref(entityKey).orderByKey().limitToLast(100),
        isInitialLoadingComplete: false
    }

    session.ref.on('child_added', snapshot => {
        if ( !session.isInitialLoadingComplete ) {
            return
        }

        const entity = { id: snapshot.key, ...snapshot.val() }
        onReceiveEntity && onReceiveEntity(entity)
    })

    session.ref.on('child_removed', snapshot => {
        const entity = { id: snapshot.key, ...snapshot.val() }
        onRemoveEntity && onRemoveEntity(entity)
    })

    session.ref.on('child_changed', snapshot => {
        const entity = { id: snapshot.key, ...snapshot.val() }
        onUpdateEntity && onUpdateEntity(entity)
    })

    session.ref.once('value', snapshot => {
        // console.log(`value callback triggered: `, snapshot.val())
        R.forEachObjIndexed((v, k) => onReceiveEntity && onReceiveEntity({...v, id: k}), snapshot.val()) // snapshot.val()
        session.isInitialLoadingComplete = true
        onInitialLoadingComplete && onInitialLoadingComplete()
    })
}

const stopListening = entityKey => entitySessions[entityKey] && entitySessions[entityKey].ref.off()

export default connect()(class Firebase extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props

        dispatch(setLoadingStateForInitialUsers(true))
        startListening('users', {
            onReceiveEntity: entity => dispatch(handleUserCreate(entity)),
            onRemoveEntity: entity => dispatch(handleUserDelete(entity)),
            onUpdateEntity: entity => dispatch(handleUserUpdate(entity)),
            onInitialLoadingComplete: () => dispatch(setLoadingStateForInitialUsers(false))
        })

        dispatch(setLoadingStateForInitialGroups(true))
        startListening('groups', {
            onReceiveEntity: entity => dispatch(handleGroupCreate(entity)),
            onRemoveEntity: entity => dispatch(handleGroupDelete(entity)),
            onUpdateEntity: entity => dispatch(handleGroupUpdate(entity)),
            onInitialLoadingComplete: () => dispatch(setLoadingStateForInitialGroups(false))
        })
    }
    componentWillUnmount() {
        stopListening('users')
        stopListening('groups')
    }
    render() {
        return null
    }
})