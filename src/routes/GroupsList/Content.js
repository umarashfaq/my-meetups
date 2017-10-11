import React from 'react'
import Button from 'react-toolbox/lib/button/Button'

import { InfoChip } from '../../components'

const Content = ({ filteredGroups, onClickItem, counts }) => (
    <section>
        <ul className="GroupList-List">
            {
                filteredGroups.map(g =>
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
        <p className="GroupsList-Status">{filteredGroups.length} record(s) found</p>
    </section>
)

export default Content