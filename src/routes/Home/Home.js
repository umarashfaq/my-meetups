import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Button from 'react-toolbox/lib/button/Button'

export default connect()(class Home extends React.Component {
    handleClickGroups = () => {
        const { dispatch } = this.props
        dispatch(push('/groups'))
    }
    handleClickUsers = () => {
        const { dispatch } = this.props
        dispatch(push('/users'))
    }
    render() {
        return (
            <article className="Home">
                <h1 className="Home-Heading">MyMeetups</h1>
                <p className="Home-Tagline">An app that demonstrates use of React, Redux, Firebase, React-Toolbox, and ES6</p>
                <div className="Home-Actions">
                    <Button label="View Users" accent raised onClick={this.handleClickUsers}/> <Button label="View Groups" accent raised onClick={this.handleClickGroups}/>
                </div>
            </article>
        )
    }
})