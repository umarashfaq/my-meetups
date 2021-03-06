// libs
import React from 'react'
import { Route, Switch } from 'react-router-dom'

// src
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
      <main className="App">
        <Route component={Header}/>
        <div className="App-Content">
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
        </div>
        <Firebase/>
      </main>
    )
  }
}