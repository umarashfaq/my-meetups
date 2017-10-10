import React from 'react'
import Button from 'react-toolbox/lib/button/Button'

const Content = ({ entity, members }) => (
    <section>
        <p>{entity.name}</p>
        <ul>
            {
                members.map(m => <li>{m && m.lastName}</li>)
            }
        </ul>
    </section>
)

export default Content