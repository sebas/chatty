import React, { Component } from 'react';

class ChatBar extends Component {
  // NewMessageForm(props) {
  // const onSubmit = evt => {
  //   evt.preventDefault();
  //   const message = evt.target.elements.message;
  //   props.addNewMessage(message.value);
  //   message.value = "";
  // };


  //         <form onSubmit={onSubmit}>

  render() {
    const onKeyUpUsername = evt => {
      evt.preventDefault();
      if (evt.key === "Enter" && evt.target.value !== '') {
        const username = evt.target;
        this.props.changeUsername(username.value);
      }
    };

    const onBlurUsername = evt => {
      evt.target.value = this.props.currentUser;
    };

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