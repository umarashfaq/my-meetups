// lib
import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'
import R from 'ramda'

import AppBar from 'react-toolbox/lib/app_bar/AppBar'
import Tabs from 'react-toolbox/lib/tabs/Tabs'
import Tab from 'react-toolbox/lib/tabs/Tab'

// src
import './Header.css'

const tabs = ['/users', '/groups']

export default connect((state, ownProps) => {
    const pathname = R.path(['location', 'pathname'], ownProps)
    const tabIndex = R.findIndex(item => pathname.indexOf(item) > -1, tabs)

    return { tabIndex }
})(class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            index: 0
        }
    }
    handleTabChange = index => {
        const { dispatch } = this.props
        dispatch(push(tabs[index]))
    }
    render() {
        const { tabIndex } = this.props

        return (
            <div className="Header">
                <AppBar fixed>
                    <div className="Header-AppBar-Grid">
                        <div className="Header-AppBar-InnerWrapper">
                            <Link to="/" className="Header-AppBar-Logo">MyMeetups</Link>
                            <Tabs index={tabIndex} onChange={this.handleTabChange} inverse theme={{navigation: 'Header-AppBar-Tabs-Nav', tab: 'Header-AppBar-Tabs-Tab'}}>
                                <Tab label="Users"/>
                                <Tab label="Groups"/>
                            </Tabs>
                        </div>
                    </div>
                </AppBar>
            </div>
        )
    }
})