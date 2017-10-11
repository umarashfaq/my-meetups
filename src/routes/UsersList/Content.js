import React from 'react'
import Button from 'react-toolbox/lib/button/Button'

import { InfoChip } from '../../components'
// <li key={id}>{lastName}, {firstName} / {email} <Button label="Detail" onClick={onClickDetails.bind(null, id)}/> <Button label="Edit" onClick={onClickEdit.bind(null, id)}/></li>
const Content = ({ users, onClickEdit, onClickDetails }) => (
    <section>
        <ul className="UserList-List">
            {
                users.map(user =>
                    <li className="UserList-Item">
                        <InfoChip key={user.id} entity={user} primaryText={`${user.firstName} ${user.lastName}`} secondaryText={user.email} onClick={onClickDetails.bind(null, user.id)}/>
                    </li>)
            }
        </ul>

    </section>
)

export default Content