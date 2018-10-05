import React, { Component } from 'react';

class Message extends Component {
  render() {
    console.log('pal switch', this.props);
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
        // show an error in the console if the message type is unknown
        throw new Error('Unknown event type ' + this.props.type);
    }

  }
}

export default Message;