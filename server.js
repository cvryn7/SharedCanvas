/**
 * This file defines server for the collaborate/shared canvas
 */
var port = 3000;
const express = require('express');
const socket = require('socket.io');
const app = express();
//allow express to host static files.
app.use(express.static('public'));
const server = app.listen(port, () => {
    console.log("Server started at port: " + port);
});

const io = socket(server);

io.sockets.on('connection', (socket) => {
    console.log(socket);
});



