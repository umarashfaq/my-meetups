import React from 'react'
import PropTypes from 'prop-types'

import './Avatar.css'

const getInitial = s => s ? s.charAt(0).toUpperCase() : ''
const getUserInitials = ({ firstName, lastName }) => getInitial(firstName) + getInitial(lastName)
const getGroupInitials = ({ name }) => getInitial(name)
const getEntityInitials = entity => (entity.firstName ? getUserInitials : getGroupInitials)(entity)

const Avatar = ({ entity, className = '' }) => (
    <div className={['Avatar', className].join(' ')}>{getEntityInitials(entity)}</div>
)

Avatar.propTypes = {
    entity: PropTypes.object.isRequired,
    className: PropTypes.string
}

export default Avatar