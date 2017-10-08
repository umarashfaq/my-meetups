// libs
import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

// src
import fire from './fire'
import { Home, UsersList } from './routes'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] }; // <- set up react state
  }
  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    })
  }
  addMessage(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref('messages').push( this.inputEl.value );
    this.inputEl.value = ''; // <- clear the input
  }
  /*
  render() {
    return (
      <form onSubmit={this.addMessage.bind(this)}>
        <input type="text" ref={ el => this.inputEl = el }/>
        <input type="submit"/>
        <ul>
            this.state.messages.map( message => <li key={message.id}>{message.text}</li> )
          }
        </ul>
      </form>
    );
  }
  */

  render() {
    return (
      <div>
        <header>
          <Link to="/">Home</Link>
          <Link to="/users">Users</Link>
        </header>
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={UsersList} />
        </main>
      </div>
    )
  }
}

export default App;