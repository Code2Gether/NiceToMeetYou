import { Room } from './src/models/room';
import { SocketJoinDisconnect, SocketMessage } from './src/utils/types';
import { http } from './app';
const io = require('socket.io')(http);

io.on('connect', (socket) => {
    socket.on(
        'join',
        async (
            { user, roomId }: SocketJoinDisconnect,
            callback: (msg?: string) => void
        ) => {
            const room = await Room.findOne({ users: user._id }).populate(
                'users'
            );

            if (!room || room._id.toString() !== roomId)
                return callback('Sorry! Room not found!');

            socket.join(room._id);

            socket.broadcast.to(room._id).emit('message', {
                text: `${user.firstName} ${user.lastName} has joined the room!`,
            });

            io.to(room._id).emit('roomData', {
                room: room._id,
                users: room.users,
            });

            callback();
        }
    );

    socket.on(
        'sendMessage',
        async ({ message, user }: SocketMessage, callback: () => void) => {
            const room = await Room.findOne({ users: user._id });

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

    socket.on('disconnect', async ({ user, roomId }: SocketJoinDisconnect) => {
        try {
            const room = await Room.findOne({ _id: roomId });
            if (user._id === room.admin.toString()) {
                await room.remove();
                io.to(roomId).emit('closeRoom');
            } else {
                //! Leave room
                const userDoc = room.users.find(
                    (doc) => doc._id.toString() === user._id
                );
                await userDoc.remove();
                await room.save();
                io.to(roomId).emit('message', {
                    text: `${user.firstName} ${user.lastName} has left.`,
                });
            }
        } catch (error) {
            io.to(roomId).emit('error', { error: error, message: '' });
        }
    });
});
