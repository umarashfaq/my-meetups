import React from 'react'
import Button from 'react-toolbox/lib/button/Button'

const Content = ({ entity, groups }) => (
    <section>
        <p>{entity.lastName}, {entity.firstName}</p>
        <p>{entity.email}</p>
        <ul>
            {
                groups.map(g => <li>{g && g.name}</li>)
            }
        </ul>
    </section>
)

export default Content