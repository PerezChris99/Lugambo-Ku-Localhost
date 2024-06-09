const socket = io();

const { username, room } = { username: 'User', room: 'general' }; // You can replace this with a form to get these values

socket.emit('join', { username, room });

socket.on('message', message => {
  const li = document.createElement('li');
  li.innerText = message;
  document.getElementById('messages').appendChild(li);
});

document.getElementById('message-form').addEventListener('submit', event => {
  event.preventDefault();
  const message = document.getElementById('message-input').value;
  socket.emit('sendMessage', message);
  document.getElementById('message-input').value = '';
});
