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

    // Listen for joining a room
    socket.on('joinRoom', (roomNumber) => {
        console.log(`A user joined room: ${roomNumber}`);
        socket.join(roomNumber);
    });

    // Modify to emit message only to sockets in the same room
    socket.on('message', (message, roomNumber) => {
        console.log('Received message:', message);
        io.to(roomNumber).emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Socket.io server is running on ${PORT}`);
});
