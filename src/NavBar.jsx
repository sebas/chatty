import React, { Component } from 'react';

// The NavBar display the name of the app and the number of connected
// user, that information is updated when users connect/disconnect.

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <h3 id="usersCount">{this.props.users} users online</h3>
      </nav>
    );
  }
}

export default NavBar;