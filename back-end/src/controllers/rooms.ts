import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import { Room } from '../models/room';

const create: RequestHandler = async (req, res) => {
    const password: string = req.body.password;
    if (password.length < 7)
        return res.status(400).json({ message: 'Invalid password' });

    await Room.findOneAndDelete({ admin: req.user._id });
    const room = await new Room({
        password,
        admin: req.user._id,
        tempRoomId: mongoose.Types.ObjectId(),
    });
    await room.users.push(req.user._id);
    await room.save();
    res.status(201).json({ tempRoomId: room.tempRoomId });
};

const join: RequestHandler = async (req, res) => {
    const tempRoomId: string = req.params.roomId;
    const roomPassword: string = req.body.password;

    try {
        const roomDoc = await Room.findOne({ users: req.user._id });
        if (roomDoc)
            return res.status(400).json({
                message: 'You cannot be in two rooms at the same time',
            });
        const room = await Room.findOne({ tempRoomId });
        room.comparePassword(roomPassword, async (error, isMatch) => {
            if (isMatch) {
                await room.users.push(req.user._id);
                await room.save();
                return res.json({ roomId: room._id });
            }
            res.status(400).json({ message: 'Wrong credentials' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

const deleteRoom: RequestHandler = async (req, res) => {
    const roomId = req.params.roomId;

    try {
        const room = await Room.findOne({ _id: roomId });
        if (!room) return res.status(404).json({ message: 'RoomId not found' });
        if (`${room.admin}` === req.user._id) {
            await room.remove();
            return res.json({ message: 'Room has been deleted.' });
        }
        res.status(401).json({
            message: 'Not authorized, your are not admin of this room.',
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

export const roomCtrl = {
    create,
    join,
    deleteRoom,
};
