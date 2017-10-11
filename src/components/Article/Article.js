import React from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import './Article.css'
import Breadcrumbs from '../Breadcrumbs'
import Loading from './Loading'
import BlankSlate from './BlankSlate'

const Article = ({ title, actions, location, children, isAvailable = true, isLoading = false }) => (
    <article>
        <DocumentTitle title={`${title} - MyMeetups`}/>
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
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    isAvailable: PropTypes.bool,
    isLoading: PropTypes.bool,
    location: PropTypes.object.isRequired,
    actions: PropTypes.element
}

export default Article