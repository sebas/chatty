import React, { Component } from 'react';
import Message from  './Message.jsx';

// The MessageList component uses the Message component to display
// all the messages that are in the state of that client.
// If new messages arrive they are displayed here.

// To build the message list we take all the messages in the state
// and one by one ask the Message compoenent to render them for us.

class MessageList extends Component {
  render() {
    const messageItems = this.props.messages.map(message => (
      <Message key={message.id} username={message.username} content={message.content} type={message.type} />    
    ));
    return (
      <main className="messages">
      {messageItems}
      </main>
    );
  }
}

export default MessageList;