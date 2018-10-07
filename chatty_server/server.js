// server.js

const express = require('express');
const SocketLib = require('ws');
const SocketServer = SocketLib.Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({
  server
});

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketLib.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log('# of clients connected', wss.clients.size);
  wss.broadcast({
    id: uuidv1(),
    username: 'System',
    content: wss.clients.size,
    type: 'usersNotification'
  });

  ws.on('message', function incoming(data) {
    console.log('message received', data);
    const {
      username,
      content,
      type
    } = JSON.parse(data);
    let newType;
    switch (type) {
    case 'postMessage':
      newType = 'incomingMessage';
      break;
    case 'postNotification':
      newType = 'incomingNotification';
      break;
    }
    const newMessage = {
      id: uuidv1(),
      username: username,
      content: content,
      type: newType
    };
    console.log('message going back', newMessage);
    wss.broadcast(newMessage);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected', wss.clients.size);
    wss.broadcast({
      id: uuidv1(),
      username: 'System',
      content: wss.clients.size,
      type: 'usersNotification'
    });
  });
});