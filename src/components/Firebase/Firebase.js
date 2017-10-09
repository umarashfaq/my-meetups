import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

// src
import { receiveUser, setLoadingStateForInitialUsers } from '../../actions'
import fire from '../../fire'

let usersRef
let initialUsersLoaded = false

const startListening = ({ dispatch }) => {
    if ( usersRef ) {
        // don't listen twice
        return
    }

    dispatch(setLoadingStateForInitialUsers(true))

    /* Create reference to messages in Firebase Database */
    usersRef = fire.database().ref('users').orderByKey().limitToLast(100);

    usersRef.on('child_added', snapshot => {
        if ( !initialUsersLoaded ) {
            return
        }

        console.log(`child_added callback triggered: `, snapshot.val())
        
        const user = { id: snapshot.key, ...snapshot.val() }
        dispatch(receiveUser(user))
    })

    usersRef.once('value', snapshot => {
        console.log(`value callback triggered: `, snapshot.val())
        R.forEachObjIndexed((v, k) => dispatch(receiveUser({...v, id: k})), snapshot.val()) // snapshot.val()
        initialUsersLoaded = true
        dispatch(setLoadingStateForInitialUsers(false))
    })
}

const stopListening = () => {
    usersRef && usersRef.off()
}

export default connect()(class Firebase extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        startListening({ dispatch })
    }
    componentWillUnmount() {
        stopListening()
    }
    render() {
        return null
    }
})