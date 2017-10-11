import React from 'react'
import Card from 'react-toolbox/lib/card/Card'
import PropTypes from 'prop-types'

import './Section.css'

const Section = ({ children, half = false }) => (
    <section className={['Section', half ? 'Section-Half' : ''].join(' ')}>
        <Card><div className="Section-Wrapper">{children}</div></Card>
    </section>
)

Section.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    half: PropTypes.bool
}

export default Section