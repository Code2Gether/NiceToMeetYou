import express, { Request, Response } from 'express';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';
import { Room } from './src/models/room';
import { SocketJoinDisconnect, SocketMessage } from './src/utils/types';

require('./src/config/database');
const app = express();

const http = require('http').Server(app);

const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(http, {
    debug: true,
});

const io = require('socket.io')(http);

io.on('connect', (socket) => {
    socket.on('join', async({ user, roomId }: SocketJoinDisconnect, callback: (msg?: string) => void) => {
        const room = await Room.findOne({ users: user._id }).populate('users');
        
        if (!room || room._id.toString() !== roomId) return callback("errorrrrrrrrrrrrrrrrrrr");

        socket.join(room._id);

        socket.broadcast.to(room._id).emit('message', { text: `${user.firstName} ${user.lastName} has joined the room!` });

        io.to(room._id).emit('roomData', { room: room._id, users: room.users });

        callback();
    });

    socket.on('sendMessage', async ({ message, user }: SocketMessage, callback: () => void) => {
        const room = await Room.findOne({ users: user._id });

        io.to(room._id).emit('message', { user: `${user.firstName} ${user.lastName}`, text: message });

        callback();
    });

    socket.on('disconnect', async ({ user, roomId }: SocketJoinDisconnect) => {
        try {
            const room = await Room.findOne({ _id: roomId });
            if(user._id === room.admin.toString()) {
                await room.remove();
                io.to(roomId).emit('closeRoom');
            } else {
                //! Leave room
                const userDoc = room.users.find((doc) => doc._id.toString() === user._id);
                await userDoc.remove();
                await room.save();
                io.to(roomId).emit('message', { text: `${user.firstName} ${user.lastName} has left.` });
            }
        } catch (error) {
            io.to(roomId).emit('error', { error: error, message: ''});
        }
    })
});

app.use(cors());
app.use('/peerjs', peerServer);
app.use(logger('dev'));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use('/api/users', require('./src/routes/users'));
app.use('/api/rooms', require('./src/routes/rooms'));

app.get('/*', (req: Request, res: Response) => {
    res.status(404).json({ message: "Path doesn't exist" });
});

export default http;
