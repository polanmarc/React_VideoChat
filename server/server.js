const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const corsOptions = {
    origin: 'http://localhost:5173/',
    methods: ['GET', 'POST']
};

app.use(cors(corsOptions));

io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado');

    socket.on('imgChat', (data) => {
        io.emit('imgChat', data);
    });

    socket.on('filter', (filter) => {
        io.emit('filter', filter);
    });

    socket.on('messageChat', (messageWithUser) => {
        io.emit('messageChat', messageWithUser);
    });

    socket.on('editMessageChat', (messageWithUser) => {
        io.emit('editMessageChat', messageWithUser);
    });

    socket.on('deleteMessageChat', (messageWithUser) => {
        io.emit('deleteMessageChat', messageWithUser);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

io.engine.on('headers', (headers) => {
    headers['Access-Control-Allow-Origin'] = 'http://localhost:5173';
    headers['Access-Control-Allow-Methods'] = 'GET, POST';
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`El servidor se esta escuchando por el puerto: ${PORT}`);
});
