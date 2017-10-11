// libs
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Card from 'react-toolbox/lib/card/Card'

// src
import './InfoChip.css'
import Avatar from '../Avatar'

const InfoChip = ({ entity, primaryText, secondaryText, onClick, className = '' }) => (
    <div className={['InfoChip', className].join(' ')} onClick={ onClick }>
        <Card className="InfoChip-Card">
            <div className="InfoChip-Content">
                <Avatar entity={entity} className="InfoChip-Avatar"/>
                <div className="InfoChip-Info">
                    <p className="InfoChip-Info-Primary">{primaryText}</p>
                    <p className="InfoChip-Info-Secondary">{secondaryText}</p>
                </div>
            </div>
        </Card>
    </div>
)

InfoChip.propTypes = {
    entity: PropTypes.object.isRequired,
    primaryText: PropTypes.string.isRequired,
    secondaryText: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string
}

export default InfoChip