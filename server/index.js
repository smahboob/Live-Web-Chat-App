//import statements
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const router = require('./router')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

//creare port and server
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 8000;
app.use(router);


//use this io.on to manage all the socket connections and sending and receiving messages. 
//this is executed each time a new connection is made on socket.

io.on('connect', (socket) => {

    //receving this logged in messaged from client side when a new user joins the chat 
    //using the users method to add to users array
    socket.on('loggedIn', ({ name, room }, callback) => {
        const {error, user} = addUser({ id: socket.id, name, room });

        //if error return callback
        if(error) return callback(error);
        socket.join(user.room);

        //emit the welcome message to the user who joined from backend to the front end
        socket.emit('message', { user: 'ChatBot', text: `${user.name} welcome to the ${user.room} room.` })

        //broadcast and emit the message of new user to other users 
        socket.broadcast.to(user.room).emit('message' , { user: 'ChatBot', text: `${user.name} has joined the room.` })
        
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();

    })

    //get the message typed by user in the frontend and wait and handle here in backend
    socket.on('messageSent', ( message, callback ) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message })
    })

    //when a user disconnects the chat
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('message', { user: 'ChatBot', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
          }
    })

})


//run the server
server.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
})

