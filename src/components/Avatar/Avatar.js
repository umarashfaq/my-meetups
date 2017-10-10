import React from 'react'
import PropTypes from 'prop-types'

import './Avatar.css'

const getInitial = s => s ? s.charAt(0).toUpperCase() : ''
const getUserInitials = ({ firstName, lastName }) => getInitial(firstName) + getInitial(lastName)

const Avatar = ({ user, className = '' }) => (
    <div className={['Avatar', className].join(' ')}>{getUserInitials(user)}</div>
)

Avatar.propTypes = {
    user: PropTypes.object.isRequired,
    className: PropTypes.string
}

export default Avatar