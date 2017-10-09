// lib
import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'
import Tabs from 'react-toolbox/lib/tabs/Tabs'
import Tab from 'react-toolbox/lib/tabs/Tab'
import R from 'ramda'

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
            <header>
                <div className="logo">
                    <Link to="/">MyMeetups</Link>
                </div>
                <div>
                    <Tabs index={tabIndex} onChange={this.handleTabChange}>
                        <Tab label="Users"><small>Users</small></Tab>
                        <Tab label="Groups"><small>Groups</small></Tab>
                    </Tabs>
                </div>
            </header>
        )
    }
})