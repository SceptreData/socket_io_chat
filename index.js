let Express = require('express');
let app = Express();
let http = require('http').Server(app);

let io = require('socket.io')(http);

http.listen(3000, function() {
  console.log('Listening  on *:3000.');
});


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Chatroom
let numUsers = 0;

io.on('connection', function(socket) {
  console.log('A user has connected!');

  var addedUser = false;

  socket.on('chat_msg', function(msg) {

    socket.broadcast.emit('chat_msg', {
      username: socket.username,
      message: msg
    });

    io.emit('chat_msg', msg);
  });

  socket.on('new_user', function (name) {
    if (addedUser) return;

    socket.username = username;
    numUsers++;

    addedUser = true;
    socket.emit('login', { numUsers: numUsers });

    socket.broadcast.emit('user_connected', {
      username:  socket.username,
      numUsers: numUsers
    });
  });


  socket.on('disconnect', function() {
    if (addedUser) {
      numUsers--;
      socket.broadcast.emit('user_dc', {
        username: socket.username,
        numUsers: numUsers
      });
    });

    socket.broadcast.emit('chat_msg', 'Someone left!');
    console.log('User disconnected');
  });

});


// app.get('/', function(req, res) {
//   res.send('<h1>Hello World!</h1>');
// });
