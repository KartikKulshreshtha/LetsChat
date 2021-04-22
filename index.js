//This is our node server which will handle our socket connections
const io = require('socket.io')(8000)

//Yaha users mein hum users ke naam append krwate rahenge
const users = {};

//io.on listen all the socket connections
io.on('connection', socket=>{
    //and socket.on listen a particular socket connection
    socket.on('new-user-joined', _name=>{
        //Yaha hum users ke naam append krwa rhe h users array mein
        users[socket.id] = _name;
        //Yaha hum emit kr rhe h ki user joined hua h
        socket.broadcast.emit('user-joined', _name)
    });
    //If someone send the message ,broadcast it to other users
    socket.on('send', message =>{
        //Yaha hum emit krwa rhe h ki message receive hua h
        socket.broadcast.emit('receive', {message: message, _name: users[socket.id]})
    });

    //If someone LEFT THE CHAT, broadcast it to other users
    socket.on('disconnect', message =>{
        //Yaha hum emit krwa rhe h ki message receive hua h
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id]
    });
})