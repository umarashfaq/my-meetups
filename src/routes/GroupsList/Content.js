import React from 'react'
import Button from 'react-toolbox/lib/button/Button'

const Content = ({ groups, onClickDelete }) => (
    <section>
        <ul>
            {
                groups.map(({id, name}) => <li key={id}>{name} <Button label="DELETE" onClick={ onClickDelete.bind(null, id) }/></li>)
            }
        </ul>
    </section>
)

export default Content