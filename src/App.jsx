import React, { Component } from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import { generateRandomId } from './util';

class App extends Component {

  constructor(props) {
    super(props);
    this.wsSocket = new WebSocket('ws://0.0.0.0:3001/');
    this.state = {
      loaded: false,
      data: {
        currentUser: { name: 'Bob' }, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: []
      }
    };
    this.addNewMessage = this.addNewMessage.bind(this);
    this.wsSocket.onmessage = (event) => {
      console.log("we got a message", event.data);
      const newMessage = JSON.parse(event.data);
      const messages = this.state.data.messages.concat(newMessage);
      // code to handle incoming message
      let data = { ...this.state.data };
      data.messages = messages;
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ data });
    }
  }

  addNewMessage(message) {
    this.wsSocket.send(JSON.stringify({ username: this.state.data.currentUser.name, content: message }));
    // const messages = this.state.data.messages.concat(newMessage);
    // let data = { ...this.state.data };
    // data.messages = messages;
    // // Update the state of the app component.
    // // Calling setState will trigger a call to render() in App and all child components.
    // this.setState({ data });
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    this.wsSocket.onopen = function (event) {
      console.log('Connected to WebSocket server...');
      // this.wsSocket.send("Here's some text that the server is urgently awaiting!"); 
    };
    setTimeout(() => {
      console.log('Simulating incoming message');
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 3, username: 'Michelle', content: 'Hello there!' };
      const messages = this.state.data.messages.concat(newMessage);
      let data = { ...this.state.data };
      data.messages = messages;
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ data });
    }, 3000);
  }

  render() {
    return (
      <div><NavBar /><MessageList messages={this.state.data.messages} /><ChatBar currentUser={this.state.data.currentUser.name} addNewMessage={this.addNewMessage} /></div>
    );
  }
}

export default App;
