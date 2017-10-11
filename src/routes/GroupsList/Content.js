import React from 'react'
import Button from 'react-toolbox/lib/button/Button'

import { InfoChip } from '../../components'

const Content = ({ groups, onClickItem, counts }) => (
    <section>
        <ul className="GroupList-List">
            {
                groups.map(g =>
                    <li key={g.id}  className="GroupList-Item">
                        <InfoChip
                            entity={g}
                            primaryText={g.name}
                            secondaryText={`${counts[g.id] || 0} member(s)`}
                            onClick={onClickItem.bind(null, g.id)}/>
                    </li>
                )
            }
        </ul>
    </section>
)

export default Content