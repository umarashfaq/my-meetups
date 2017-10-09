import React from 'react'

const Content = ({ groups }) => (
    <section>
        <ul>
            {
                groups.map(({id, name}) => <li key={id}>{name}</li>)
            }
        </ul>
    </section>
)

export default Content