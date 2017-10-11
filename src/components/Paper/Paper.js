import React from 'react'
import Card from 'react-toolbox/lib/card/Card'
import PropTypes from 'prop-types'

import './Paper.css'

const Paper = ({ children, half = false }) => (
    <div className={['Paper', half ? 'Paper-Half' : ''].join(' ')}>
        <Card><div className="Paper-Wrapper">{children}</div></Card>
    </div>
)

Paper.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    half: PropTypes.bool
}

export default Paper