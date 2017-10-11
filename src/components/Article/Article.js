import React from 'react'
import PropTypes from 'prop-types'

import './Article.css'
import Breadcrumbs from '../Breadcrumbs'
import Loading from './Loading'
import BlankSlate from './BlankSlate'

const Article = ({ title, actions, location, children, isAvailable = true, isLoading = false }) => (
    <article>
        <Breadcrumbs pathname={location.pathname}/>
        <div className="Article-Header">
            <h1>{title}</h1>
            <div className="Article-Actions">{actions}</div>
        </div>
        {
            isLoading    ? <Loading />    :
            !isAvailable ? <BlankSlate /> :
                        children
        }
    </article>
)

Article.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    isAvailable: PropTypes.bool,
    isLoading: PropTypes.bool,
    location: PropTypes.object.isRequired,
    actions: PropTypes.element
}

export default Article