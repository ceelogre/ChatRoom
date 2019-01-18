var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require('cors');
let chatUtils = require('./utils/chatUtils')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
let http = require('http').Server(app);
let ioServer = require('socket.io')(http);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chats', indexRouter);

ioServer.on('connection', function(socket){
    socket.on('connection', function(data){
        socket.join('fse room', () => {
            socket.broadcast.to('fse room').emit('join', data)
        })
        console.log('Pre ', data)
    })
    socket.on('disconnection', function(data){
        socket.leave('fse room', () => {
          socket.broadcast.to('fse room').emit('left', data)
        })
        console.log('One connection lost. ')
    })
    socket.on('newMsg', function(data){
        chatUtils.saveMessage(data).then(
            (msg) => {
                let postedMessage = {
                    text: msg.text,
                    postedBy: msg.postedBy,
                    postedAt: new Date(msg.postedAt).toString()
                }
                ioServer.to('fse room').emit('receivedMsg', postedMessage);
            }
        )
        .catch(
            (err) =>{
                console.log('Error saving', err)
            }
        )
    })
})


http.listen(3001)
module.exports = app;
