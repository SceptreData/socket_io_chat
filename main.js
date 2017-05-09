let Express = require('express');
let app = Express();
let http = require('http').Server(app);

let io = require('socket.io')(http);

http.listen(3000, function() {
  console.log('Running SceptreChat on Port: 3000.');
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Chatroom
let n_users = 0;

io.on('connection', function(socket) {
  console.log('A user has connected!');

  let connected = false;

  
  socket.on('new_user', function (user_id) {
    if (connected) return;

    socket.id = user_id;
    n_users++;

    connected = true;
    socket.emit('login', { n_users: n_users });

    socket.broadcast.emit('user_connected', {
      id:  socket.id,
      n_users: n_users
    });
  });

  socket.on('chat_msg', function(msg) {

    socket.broadcast.emit('chat_msg', {
      id: socket.id,
      message: msg
     });
  });

  socket.on('typing', function() {
    socket.broadcast.emit('typing',  {socket.id});
  });
  
  socket.on('stop typing', function() {
    socket.broadcast.emit('stop typing',  {socket.id});
  });

  socket.on('disconnect', function() {
    if (connected) {
      --n_users;
      socket.broadcast.emit('user_dc', {
        id: socket.id,
        n_users: n_users
      });
      connected = false;
    };
    socket.broadcast.emit('chat_msg', socket.id + " has left!");
    console.log('User disconnected');
  });
});


// app.get('/', function(req, res) {
//   res.send('<h1>Hello World!</h1>');
// });
