import React from 'react'

const Content = ({ users }) => (
    <section>
        <ul>
            {
                users.map(({id, firstName, lastName, email}) => <li key={id}>{lastName}, {firstName} / {email}</li>)
            }
        </ul>
    </section>
)

export default Content