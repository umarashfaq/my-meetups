import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

// src
import {
    receiveUser,
    receiveGroup,
    setLoadingStateForInitialUsers,
    setLoadingStateForInitialGroups
} from '../../actions'
import fire from '../../fire'

const entitySessions = {}

const startListening = (entityKey, { dispatch, onInitialLoadingComplete, onReceiveEntity }) => {
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

        // console.log(`child_added callback triggered: `, snapshot.val())
        
        const entity = { id: snapshot.key, ...snapshot.val() }
        onReceiveEntity && onReceiveEntity(entity)
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
            onReceiveEntity: entity => {
                dispatch(receiveUser(entity))
            },
            onInitialLoadingComplete: () => {
                dispatch(setLoadingStateForInitialUsers(false))
            }
        })

        dispatch(setLoadingStateForInitialGroups(true))
        startListening('groups', {
            onReceiveEntity: entity => {
                dispatch(receiveGroup(entity))
            },
            onInitialLoadingComplete: () => {
                dispatch(setLoadingStateForInitialGroups(false))
            }
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