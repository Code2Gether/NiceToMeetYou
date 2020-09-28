import { Room } from './src/models/room';
import { User } from './src/models/user';
import {
    SocketJoinDisconnect,
    SocketMessage,
    ErrorType,
} from './src/utils/types';
import { http } from './app';
import mongoose from 'mongoose';
const io = require('socket.io')(http);

try {
    io.on('connection', (socket) => {
        socket.on(
            'join',
            async (
                { user, roomId }: SocketJoinDisconnect,
                callback: (msg?: string) => void
            ) => {
                try {
                    const userDoc = await User.findOne({ _id: user._id });
                    if (userDoc.roomId !== roomId)
                        return callback('Sorry! Room not found!');

                    userDoc.socketId = socket.id;
                    await userDoc.save();
                    const room = await Room.findOne({
                        users: mongoose.Types.ObjectId(user._id),
                    }).populate('users');

                    if (!room || room._id.toString() !== roomId)
                        return callback('Sorry! Room not found!');

                    socket.join(room._id);

                    socket.to(room._id).broadcast.emit('user-connected', {
                        text: `${user.firstName} ${user.lastName} has joined the room!`,
                        userId: user._id,
                    });

                    io.to(room._id).emit('roomData', {
                        room: room._id,
                        users: room.users,
                    });
                } catch (error) {
                    io.to(roomId).emit('error', { error: error, message: '' });
                }
            }
        );

        socket.on(
            'sendMessage',
            async ({ message, user }: SocketMessage, callback: () => void) => {
                const room = await Room.findOne({
                    users: mongoose.Types.ObjectId(user._id),
                });
                const time = new Date();
                io.to(room._id).emit('message', {
                    userId: user._id,
                    user: `${user.firstName} ${user.lastName}`,
                    text: message,
                    createdAt: `${time.getHours()}:${time.getMinutes()}`,
                });

                callback();
            }
        );

        socket.on('disconnect', async () => {
            let roomId;
            try {
                const userDoc = await User.findOne({ socketId: socket.id });
                if (!userDoc)
                    throw <ErrorType>{
                        message: 'Socket ID not found',
                    };
                const room = await Room.findOne({
                    _id: userDoc.roomId,
                });
                roomId = room._id;
                if (userDoc._id.toString() === room.admin.toString()) {
                    // FIX REMOVE THE COMMENT
                    // await room.remove();
                    io.to(room._id).emit('closeRoom');
                } else {
                    // FIX REMOVE THE COMMENT
                    // room.users = room.users.filter(
                    //     (user) => user.toString() !== userDoc._id.toString()
                    // );
                    // await room.save();
                    io.to(room._id).emit('user-disconnected', {
                        text: `${userDoc.firstName} ${userDoc.lastName} has left.`,
                        userId: userDoc._id,
                    });
                }
            } catch (error) {
                if (error.name === 'SOCKET ID NOT FOUND') {
                }
                io.to(roomId).emit('error', { error: error, message: '' });
            }
        });
    });
} catch (error) {
    console.log(error);
}
