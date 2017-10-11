import React from 'react'
import { Link } from 'react-router-dom'
import R from 'ramda'
import pathToRegexp from 'path-to-regexp'

import './Breadcrumbs.css'

// pathname.split('/')
const paths = [
    {name: '/', label: 'Home', regex: pathToRegexp('/')},
    {name: '/users', label: 'Users', regex: pathToRegexp('/users')},
    {name: '/users/new', label: 'Create', regex: pathToRegexp('/users/new')},
    {name: '/users/:id', label: 'Details', regex: pathToRegexp('/users/:id')},
    {name: '/users/:id/edit', label: 'Edit', regex: pathToRegexp('/users/:id/edit')},
    {name: '/groups', label: 'Groups', regex: pathToRegexp('/groups')},
    {name: '/groups/new', label: 'Create', regex: pathToRegexp('/groups/new')},
    {name: '/groups/:id', label: 'Details', regex: pathToRegexp('/groups/:id')},
    {name: '/groups/:id/edit', label: 'Edit', regex: pathToRegexp('/groups/:id/edit')}
]

const getLabel = pathname => {
    const path = R.find(path => path.regex.test(pathname), paths)
    // console.log(path)
    return path && path.label
}

const getSteps = pathname => {
    const pieces = pathname.split('/')
    const steps =
        R.pipe(
            R.reduce((buckets, piece) => [...buckets, pieces.slice(0, pieces.indexOf(piece) + 1)], []),
            R.map(bucket => bucket.join('/')),
            R.map(path => ({label: getLabel(path), path})),
            R.map(step => step.path === pathname ? <span>{step.label}</span> : (<span><Link to={step.path}>{step.label}</Link> / </span>))
        )(pieces)

    return steps
}

const Breadcrumbs = ({ pathname }) => (
    <div className="Breadcrumbs">
        {getSteps(pathname)}
    </div>
)

export default Breadcrumbs