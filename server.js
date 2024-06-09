const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  console.log('New WebSocket connection');

  socket.on('join', ({ username, room }) => {
    socket.join(room);
    socket.emit('message', 'Welcome!');
    socket.broadcast.to(room).emit('message', `${username} has joined the chat`);

    socket.on('sendMessage', message => {
      io.to(room).emit('message', message);
    });

    socket.on('disconnect', () => {
      io.to(room).emit('message', `${username} has left the chat`);
    });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
