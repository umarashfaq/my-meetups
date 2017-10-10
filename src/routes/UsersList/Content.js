import React from 'react'
import Button from 'react-toolbox/lib/button/Button'

import { UserItem } from '../../components'
// <li key={id}>{lastName}, {firstName} / {email} <Button label="Detail" onClick={onClickDetails.bind(null, id)}/> <Button label="Edit" onClick={onClickEdit.bind(null, id)}/></li>
const Content = ({ users, onClickEdit, onClickDetails }) => (
    <section>
        <ul className="UserList-List">
            {
                users.map(user => <li className="UserList-Item"><UserItem key={user.id} user={user}/></li>)
            }
        </ul>

    </section>
)

export default Content