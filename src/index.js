const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const path = require('path');

const moongose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server); //socket connection 


//db connection
moongose.connect('mongodb://localhost/chat-database')
    .then(db => console.log('db is connected'))
    .catch(err => console.log(err));

//settings
app.set('port', process.env.PORT || 3000);

require('./sockets')(io);


//static files
app.use(express.static(path.join(__dirname, 'public')));
//starting server
server.listen(3000, ()=>{
    console.log('Server on port', app.get('port'));
});