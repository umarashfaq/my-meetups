import React from 'react'
import { Link } from 'react-router-dom'

import { Avatar, Section } from '../../components'

const Content = ({ entity, groups, onClickDelete }) => (
    <Section half>
        <div className="UserDetails-Wrapper">
            <Avatar entity={entity} className="UserDetails-Wrapper-Avatar"/>
            <div className="UserDetails-Wrapper-Info">
                <p className="UserDetails-Wrapper-Info-Primary">{entity.firstName} {entity.lastName}</p>
                <p className="UserDetails-Wrapper-Info-Secondary">{entity.email}</p>
                <ul className="UserDetails-Wrapper-Info-Groups">
                    {
                        groups.map(g => <li key={g && g.id}><Link to={`/groups/${g && g.id}`}>{g && g.name}</Link></li>)
                    }
                </ul>
                <div className="UserDetails-Wrapper-Info-Actions">
                    <Link to={`/users/${entity.id}/edit`}>Edit</Link> | <a href="/" onClick={onClickDelete}>Delete</a>
                </div>
            </div>
        </div>
    </Section>
)

export default Content