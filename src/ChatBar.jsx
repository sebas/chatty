import React, { Component } from 'react';

// The ChatBar component has the user and the messages.
// From there a user can change it username and send new messages.

class ChatBar extends Component {
  render() {
    // If a user pressed enter change its username to
    // the value that is in the field. To do that we are going
    // to signal the App component, it will alter the state
    // and send a message to the websocket server to let
    // know to the rest of the clients.
    const onKeyUpUsername = evt => {
      evt.preventDefault();
      if (evt.key === "Enter" && evt.target.value !== '') {
        const username = evt.target;
        this.props.changeUsername(username.value);
      }
    };

    // If the user left the field without pressing enter
    // reset the field to the value that we have in the state.
    const onBlurUsername = evt => {
      evt.target.value = this.props.currentUser;
    };

    // The user wants to send a message. If it is not
    // empty we capture it and signal "up" to send it
    // to the websockets server.
    const onKeyUpMessage = evt => {
      evt.preventDefault();
      if (evt.key === "Enter" && evt.target.value !== '') {
        const message = evt.target;
        this.props.addNewMessage(message.value);
        evt.target.value = '';
      }
    };

    return (
      <footer className="chatbar">
          <input className="chatbar-username" onKeyUp={onKeyUpUsername} onBlur={onBlurUsername} placeholder="Your Name (Optional)" defaultValue={this.props.currentUser} name="username" />
          <input className="chatbar-message"  onKeyUp={onKeyUpMessage}  placeholder="Type a message and hit ENTER"                               name="message" />
      </footer>
    );
  }
}

export default ChatBar;