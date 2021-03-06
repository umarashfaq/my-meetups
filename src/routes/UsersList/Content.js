import React from 'react'

import { InfoChip } from '../../components'
// <li key={id}>{lastName}, {firstName} / {email} <Button label="Detail" onClick={onClickDetails.bind(null, id)}/> <Button label="Edit" onClick={onClickEdit.bind(null, id)}/></li>
const Content = ({ users, filteredUsers, onClickEdit, onClickDetails }) => (
    <section>
        <ul className="UserList-List">
            {
                filteredUsers.map(user =>
                    <li className="UserList-Item" key={user.id}>
                        <InfoChip entity={user} primaryText={`${user.firstName} ${user.lastName}`} secondaryText={user.email} onClick={onClickDetails.bind(null, user.id)}/>
                    </li>)
            }
        </ul>
        <p className="UsersList-Status">{filteredUsers.length} record(s) found</p>
    </section>
)

export default Content