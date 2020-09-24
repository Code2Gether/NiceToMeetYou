import React, { useRef, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';
import { connect } from 'react-redux';
import Chat from '../../components/Chat/Chat';
import {
    RoomContainer,
    RoomVideoContainer,
    RoomVideo,
    RoomFooter,
    RoomHeader,
} from './Room.styles';
import { RoomProps } from '../../utils/types/types';
import { useParams } from 'react-router-dom';
import store from '../../store';

const url = process.env.REACT_APP_SERVER_URL!;
const socket: SocketIOClient.Socket = io(url);
let myPeer: Peer;
if (store.getState().user) {
    myPeer = new Peer(store.getState().user._id, {
        path: "/peerjs",
        host: "/",
        port: 3001,
    });
}

interface Peers {
    [key: string]: Peer.MediaConnection;
}

interface Data {
    userId: string;
    text: string;
}

const Room: React.FC<RoomProps> = ({ user }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { id: roomId }: { id: string } = useParams();
    const peers: Peers = {};
    const myVideo = document.createElement('video');
    myVideo.muted = true;

    const addVideoStream = useCallback(
        (video: HTMLVideoElement, stream: MediaStream) => {
            video.srcObject = stream;
            video.addEventListener('loadedmetadata', () => video.play());
            if (containerRef.current) {
                containerRef.current!.appendChild(video);
            }
        },
        [containerRef.current]
    );

    const connectNewUser = (userId: string, stream: MediaStream) => {
        const call = myPeer && myPeer.call(userId, stream);
        const video = document.createElement('video');

        call && call.on('stream', (userVideoStream) =>
            addVideoStream(video, userVideoStream)
        );

        call && call.on('close', () => video.remove());
        peers[userId] = call;
    };

    useEffect(() => {
        navigator.mediaDevices
        .getUserMedia({
            video: true,
            audio: true,
        })
        .then((stream) => {
            addVideoStream(myVideo, stream);

            myPeer && myPeer.on('call', (call) => {
                call.answer(stream);
                const video = document.createElement('video');
                call.on('stream', (userVideoStream) => {
                    return addVideoStream(video, userVideoStream);
                });
            });

            socket.on('user-connected', ({ userId }: Data) => {
                return connectNewUser(userId, stream);
            });

            socket.on('user-disconnected', ({ userId }: Data) => {
                if (peers[userId]) peers[userId].close();
            });
        });
    }, [])

    useEffect(() => {
        myPeer && myPeer.on('open', () => {
            socket.emit('join', { user, roomId });
            console.log('open')
        });
    }, []);
    // useEffect(() => {
    //     return () => {
    //         const allChildNodes = containerRef.current?.childNodes
    //         allChildNodes?.forEach(node => node.removeEventListener('loadedmetadata', () => video.play()))
    //     }
    // }, [])

    return (
        <RoomContainer>
            <RoomHeader />
            <RoomVideoContainer ref={containerRef} />
            <RoomFooter />
            <Chat socket={socket} />
        </RoomContainer>
    );
};

const mapStateToProps = (state: any) => ({
    user: state.user,
});

export default connect(mapStateToProps)(Room);
