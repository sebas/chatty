import React, { Component } from 'react';

// The Message component receives individual messages and depending
// on the type of the message renders it differently.

class Message extends Component {
  render() {
    switch (this.props.type) {
      case 'incomingNotification':
        return (
        <div className="notification">
          <span className="notification-content">{this.props.content}</span>
        </div>
        );
        break;
      case 'incomingMessage':
        return (
          <div className="message">
            <span className="message-username">{this.props.username}</span>
            <span className="message-content">{this.props.content}</span>
          </div>
        );
        break;
      default:
        // Show an error in the console if the message type is unknown
        throw new Error('Unknown message type ' + this.props.type);
    }

  }
}

export default Message;