import React from 'react'
import Button from 'react-toolbox/lib/button/Button'

const Content = ({ users, onClickEdit, onClickDetails }) => (
    <section>
        <ul>
            {
                users.map(({id, firstName, lastName, email}) => <li key={id}>{lastName}, {firstName} / {email} <Button label="Detail" onClick={onClickDetails.bind(null, id)}/> <Button label="Edit" onClick={onClickEdit.bind(null, id)}/></li>)
            }
        </ul>
    </section>
)

export default Content