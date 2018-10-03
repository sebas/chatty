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
    const onSubmit = evt => {
      evt.preventDefault();
      const message = evt.target.elements.message;
      this.props.addNewMessage(message.value);
      message.value = '';
    };

    return (
      <footer className="chatbar">
        <form onSubmit={onSubmit}>
          <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser} />
          <input className="chatbar-message" name="message" placeholder="Type a message and hit ENTER" />
          <input type="submit" id="hidden-button"></input>
        </form>
      </footer>
    );
  }
}

export default ChatBar;