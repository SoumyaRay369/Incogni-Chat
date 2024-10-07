const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;

// for CORS connection
const cors = require('cors');
app.use(cors());

// for socket.io
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', (roomNumber, peerId) => {
        console.log(`A user with peerId ${peerId} joined room: ${roomNumber}`);
        socket.join(roomNumber);

        // Store the peerId on the socket object to identify when the user disconnects
        socket.peerId = peerId;

        // Notify existing peers in the room about the new peer
        socket.to(roomNumber).emit('newPeer', peerId); // Notify others in the room of the new peer

        // Send existing peer IDs to the newly joined peer
        const clientsInRoom = io.sockets.adapter.rooms.get(roomNumber) || new Set();
        clientsInRoom.forEach((clientSocketId) => {
            if (clientSocketId !== socket.id) {
                const clientSocket = io.sockets.sockets.get(clientSocketId);
                if (clientSocket && clientSocket.peerId) {
                    socket.emit('newPeer', clientSocket.peerId);
                }
            }
        });
    });

    // Handle incoming messages and broadcast to the room
    socket.on('message', (message, roomNumber) => {
        console.log(`Received message: ${message} for room: ${roomNumber}`);
        io.to(roomNumber).emit('message', message); // Broadcast the message to everyone in the room
    });

    socket.on('disconnect', () => {
        console.log(`User with peerId ${socket.peerId} disconnected`);
        socket.to(socket.rooms).emit('peerDisconnected', socket.peerId);
    });
});


server.listen(PORT, () => {
    console.log(`Socket.io server is running on ${PORT}`);
});
