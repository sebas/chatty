import React, { Component } from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.wsSocket = new WebSocket('ws://0.0.0.0:3001/');
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

    this.wsSocket.onmessage = (event) => {
      console.log("we got a message", event.data);
      const newMessage = JSON.parse(event.data);
      if (newMessage.type === 'usersNotification') {
        this.setState({ users: newMessage.content });
      } else {
        const messages = this.state.data.messages.concat(newMessage);
        // code to handle incoming message
        let data = { ...this.state.data };
        data.messages = messages;
        // Update the state of the app component.
        // Calling setState will trigger a call to render() in App and all child components.
        this.setState({ data });
      }
    }
  }

  addNewMessage(message) {
    this.wsSocket.send(JSON.stringify({ username: this.state.data.currentUser.name, content: message, type: 'postMessage' }));
  }

  changeUsername(username) {
    let data = { ...this.state.data };
    let previous = data.currentUser.name;
    data.currentUser.name = username;
    this.setState({ data });
    this.wsSocket.send(JSON.stringify({ username: this.state.data.currentUser.name, content: `${previous} changed their name to ${username}`, type: 'postNotification' }));
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    this.wsSocket.onopen = function (event) {
      console.log('Connected to WebSocket server...');
      // this.wsSocket.send("Here's some text that the server is urgently awaiting!"); 
    };
  }

  render() {
    return (
      <div><NavBar users={this.state.users} /><MessageList messages={this.state.data.messages} /><ChatBar currentUser={this.state.data.currentUser.name} changeUsername={this.changeUsername} addNewMessage={this.addNewMessage} /></div>
    );
  }
}

export default App;
