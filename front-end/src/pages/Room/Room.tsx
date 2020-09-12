import React from 'react';
import Chat from '../../components/Chat/Chat';
import { RoomContainer, RoomVideoContainer, RoomVideo, RoomFooter, RoomHeader } from "./Room.styles";

const Room: React.FC = () => {
    return (
        <RoomContainer>
            <RoomHeader/>
            <RoomVideoContainer>Room</RoomVideoContainer>
            <RoomFooter/>
            <Chat/>
        </RoomContainer>
    );
};

export default Room;
