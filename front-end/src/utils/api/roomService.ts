import { CreateRoomProps } from '../types/types';
import reqService from './reqService';

export const createRoom = async (data: CreateRoomProps) => {
    try {
        const url = process.env.SERVER_URL_LOCAL || process.env.SERVER_URL;
        return await reqService.createRoom(`https://${process.env.REACT_APP_SERVER_URL}/api/rooms/create`, data);
    } catch (error) {
        throw new Error(error.message);
    }
};