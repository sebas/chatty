import React, { Component } from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

// This is the main component of our React App
// All the rest of the components are controlled from here.

// New messages are captured here by the onmessage event listener and
// added to the state of the app, that triggers a re render
// of only the components that need to rerender.

// The ChatBar component has the user and the messages.
// From there a user can change it username and send new messages.

// The NavBar display the name of the app and the number of connected
// user, that information is updated when users connect/disconnect.

// The MessageList component uses the Message component to display
// all the messages that are in the state of that client.
// If new messages arrive they are displayed here.

// The Message component receives individual messages and depending
// on the type of the message renders it differently.

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      loaded: false,
      users: 0,
      data: {
        currentUser: { name: 'Bob' }, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: []
      }
    };
    this.addNewMessage = this.addNewMessage.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
  }

  // This method sends a new message to the websockets server.
  // The message was typed by the user on the ChatBar component 
  // and received here thanks to the signal that component sent.
  addNewMessage(message) {
    this.wsSocket.send(JSON.stringify({ username: this.state.data.currentUser.name, content: message, type: 'postMessage' }));
  }

  // This method sends a change of username to the websockets server.
  // The change was originated by the user on the ChatBar component 
  // and received here thanks to the signal that component sent.
  changeUsername(username) {
    let data = { ...this.state.data };
    let previous = data.currentUser.name;
    data.currentUser.name = username;
    this.setState({ data });
    this.wsSocket.send(JSON.stringify({ username: this.state.data.currentUser.name, content: ` ${previous} changed their name to ${username}.`, type: 'postNotification' }));
  }

  // Here we initialize the conection to the websockets server
  // and also set an onmessage eventlistener to receive
  // the messages comming from the server.
  componentDidMount() {
    this.wsSocket = new WebSocket('ws://0.0.0.0:3001/');
    this.wsSocket.onopen = function (event) {
      console.log('Connected to WebSocket server...');
    };
    this.wsSocket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      if (newMessage.type === 'usersNotification') {
        this.setState({ users: newMessage.content });
      } else {
        const messages = this.state.data.messages.concat(newMessage);
        let data = { ...this.state.data };
        data.messages = messages;
        // Update the state of the app.
        // Calling setState will trigger a call to render() in App and all child components.
        this.setState({ data });
      }
    }
  }

  // Here each of the components receives the information it needs to render and the methods to
  // send signals.
  render() {
    return (
      <div><NavBar users={this.state.users} /><MessageList messages={this.state.data.messages} /><ChatBar currentUser={this.state.data.currentUser.name} changeUsername={this.changeUsername} addNewMessage={this.addNewMessage} /></div>
    );
  }
}

export default App;
