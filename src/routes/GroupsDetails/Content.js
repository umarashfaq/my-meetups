import React from 'react'
import { Link } from 'react-router-dom'

import { Paper, Avatar } from '../../components'

const Content = ({ entity, members, onClickDelete }) => (
    <section>
        <Paper half>
            <div className="GroupsDetails-Wrapper">
                <Avatar entity={entity} className="GroupsDetails-Wrapper-Avatar"/>
                <div className="GroupsDetails-Wrapper-Info">
                    <p className="GroupsDetails-Wrapper-Info-Primary">{entity.name}</p>
                    <ul className="GroupsDetails-Wrapper-Info-Members">
                        {
                            members.map(m => <li><Link to={`/users/${m && m.id}`}>{m && `${m.firstName} ${m.lastName}`}</Link></li>)
                        }
                    </ul>
                    <div className="GroupsDetails-Wrapper-Info-Actions">
                        <Link to={`/groups/${entity.id}/edit`}>Edit</Link> | <a href="#" onClick={onClickDelete}>Delete</a>
                    </div>
                </div>
            </div>
        </Paper>
    </section>
)

export default Content