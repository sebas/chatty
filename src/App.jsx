import React, {Component} from 'react';

import MessageList from  './MessageList.jsx';
import ChatBar from  './ChatBar.jsx';
import NavBar from  './NavBar.jsx';
import { generateRandomId } from './util';

class App extends Component {
  constructor(props) {
    super();
    this.state = { 
      loaded: false, 
      data: {
        currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [
          {
            id: 1,
            username: 'Bob',
            content: 'Has anyone seen my marbles?',
          },
          {
            id: 2,
            username: 'Anonymous',
            content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
          }
        ]
      }
    };
    this.addNewMessage = this.addNewMessage.bind(this);
  }

  addNewMessage(message) {
    const newMessage = {
      content: message,
      username: this.state.data.currentUser.name,
      id: generateRandomId()
    };
    console.log(newMessage);
    const messages = this.state.data.messages.concat(newMessage);
    let data = {...this.state.data};
    data.messages  = messages;
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({data});
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    setTimeout(() => {
      console.log('Simulating incoming message');
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.data.messages.concat(newMessage);
      let data = {...this.state.data};
      data.messages  = messages;
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({data});
    }, 3000);
  }

  render() {
    return (
      <div><NavBar /><MessageList messages={this.state.data.messages} /><ChatBar currentUser={this.state.data.currentUser.name} addNewMessage={this.addNewMessage} /></div>
    );
  }
}

export default App;
