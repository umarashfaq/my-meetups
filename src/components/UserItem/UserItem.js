// libs
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Card from 'react-toolbox/lib/card/Card'

// src
import './UserItem.css'
import Avatar from '../Avatar'

export default connect()(class UserItem extends React.Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        className: PropTypes.string
    }

    handleClick = () => {
        const { dispatch, user: { id } } = this.props
        dispatch(push(`/users/${id}`))
    }
    render() {
        const { user, className = '' } = this.props
        const { firstName, lastName, email } = user

        return (
            <div className={['UserItem', className].join(' ')} onClick={this.handleClick}>
                <Card className="UserItem-Card">
                    <div className="UserItem-Content">
                        <Avatar user={user} className="UserItem-Avatar"/>
                        <div className="UserItem-Info">
                            <p className="UserItem-Info-Primary">{firstName} {lastName}</p>
                            <p className="UserItem-Info-Secondary">{email}</p>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
})