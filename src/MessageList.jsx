import React, { Component } from 'react';
import Message from  './Message.jsx';

class MessageList extends Component {
  render() {
    const messageItems = this.props.messages.map(message => (
      <Message key={message.id} username={message.username} content={message.content} />    
    ));
    return (
      <main className="messages">
      {messageItems}
      </main>
    );
  }
}

export default MessageList;