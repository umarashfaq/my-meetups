// libs
import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

// src
import fire, { startListening, stopListening } from './fire'
import {
  Home,
  UsersList,
  UsersDetails,
  UsersCreate,
  UsersEdit,
  GroupsList,
  GroupsDetails,
  GroupsCreate,
  GroupsEdit
} from './routes'
import { Header, Firebase } from './components'
import './App.css'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <main>
          <Route component={Header}/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users" component={UsersList} />
            <Route exact path="/users/new" component={UsersCreate} />
            <Route exact path="/users/:id" component={UsersDetails} />
            <Route exact path="/users/:id/edit" component={UsersEdit} />
            <Route exact path="/groups" component={GroupsList} />
            <Route exact path="/groups/new" component={GroupsCreate} />
            <Route exact path="/groups/:id" component={GroupsDetails} />
            <Route exact path="/groups/:id/edit" component={GroupsEdit} />
          </Switch>
          <Firebase/>
        </main>
      </div>
    )
  }
}