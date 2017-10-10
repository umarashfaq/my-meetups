import React from 'react'

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