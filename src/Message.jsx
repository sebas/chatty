import React, { Component } from 'react';

class Message extends Component {
  render() {
    // ( type === incomingNotification ) ?
    // return (
    //   <div className="message system">
    //   </div>
    // )
    // :
    return (
      <div className="message">
        <span className="message-username">{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
    );
  }
}

export default Message;