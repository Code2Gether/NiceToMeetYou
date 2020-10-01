import { CreateRoomProps, AccessJoinRoomProps } from '../types/types';
import reqService from './reqService';

const http =
    +process.env.REACT_APP_SERVER_PORT! === 3001 ? 'http://' : 'https://';
const url = process.env.REACT_APP_SERVER_URL!;

export const accessRoom = async (data: AccessJoinRoomProps) => {
    try {
        return await reqService.accessRoom(
            `${http}${url}/api/rooms/${data.roomId}`
        );
    } catch (error) {
        throw new Error(error.message);
    }
};

export const joinRoom = async (data: AccessJoinRoomProps) => {
    try {
        return await reqService.joinRoom(
            `${http}${url}/api/rooms/${data.roomId}`,
            data
        );
    } catch (error) {
        throw new Error(error.message);
    }
};

export const createRoom = async (data: CreateRoomProps) => {
    try {
        return await reqService.createRoom(
            `${http}${url}/api/rooms/create`,
            data
        );
    } catch (error) {
        throw new Error(error.message);
    }
};
