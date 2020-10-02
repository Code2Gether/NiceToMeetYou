import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import Peer from 'peerjs';
import { connect } from 'react-redux';
import Chat from '../../components/Chat/Chat';
import {
    RoomContainer,
    RoomVideoContainer,
    RoomFooter,
    RoomHeader,
} from './Room.styles';
import { AppAndRoomProps } from '../../utils/types/types';
import { useParams } from 'react-router-dom';
import * as roomService from '../../utils/api/roomService';

interface Peers {
    [key: string]: Peer.MediaConnection;
}

interface Data {
    userId: string;
    text: string;
}

const Room: React.FC<AppAndRoomProps> = ({ user }) => {
    const history = useHistory();
    const peers: Peers = {};
    const { id: roomId }: { id: string } = useParams();
    const myPeerRef = useRef<Peer | null>(null);
    const socketRef = useRef<SocketIOClient.Socket | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const myVideo = document.createElement('video');
    myVideo.muted = true;
    const [loading, setLoading] = useState(true);

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
        const call = myPeerRef.current!.call(userId, stream);
        const video = document.createElement('video');

        console.log('userId', userId);
        console.log('call', call);

        if (call) {
            call.on('stream', (userVideoStream) =>
                addVideoStream(video, userVideoStream)
            );

            call.on('close', () => video.remove());

            peers[userId] = call;
        }
        console.log('peers', peers);
    };

    useEffect(() => {
        const url = process.env.REACT_APP_SERVER_URL!.split(':')[0];
        const port = +process.env.REACT_APP_SERVER_PORT!;
        // const secure = port !== 3001;

        socketRef.current = io(`${url}:${port}`);
        myPeerRef.current = new Peer(user._id, {
            path: '/peerjs',
            host: url,
            port: port,
            // secure
        });

        async function connect() {
            try {
                const access = await roomService.accessRoom({ roomId });

                if (access.status) {
                    history.push(`/join/${roomId}`);
                } else {
                    navigator.mediaDevices
                        .getUserMedia({
                            video: true,
                            audio: true,
                        })
                        .then((stream) => {
                            addVideoStream(myVideo, stream);
                            console.log(stream.getTracks());
                            myPeerRef.current!.on('call', (call) => {
                                call.answer(stream);
                                const video = document.createElement('video');
                                call.on('stream', (userVideoStream) => {
                                    return addVideoStream(
                                        video,
                                        userVideoStream
                                    );
                                });
                            });

                            socketRef.current!.on(
                                'user-connected',
                                ({ userId }: Data) => {
                                    console.log('user-connected');
                                    return connectNewUser(userId, stream);
                                }
                            );

                            socketRef.current!.on(
                                'user-disconnected',
                                ({ userId }: Data) => {
                                    //! Check if we are deleting user from peers array
                                    if (peers[userId]) peers[userId].close();
                                }
                            );

                            socketRef.current!.on('closeRoom', () => {
                                history.push('/');
                            });
                        });
                }
            } catch (error) {
                console.log(error);
                history.push('/');
            }
            setLoading(false);
        }
        connect();
        return () => {
            // socketRef.current!.emit('disconnect');
            // socketRef.current = null;
            // myPeerRef.current = null;
            console.log('component did unmounted');
            socketRef.current?.close();
            navigator.getUserMedia(
                { audio: true, video: true },
                function (stream) {
                    // can also use getAudioTracks() or getVideoTracks()
                    // var track = stream.getTracks()[0];  // if only one media track
                    // ...
                    console.log(stream.getTracks());
                    // stream.getTracks()[0].stop();
                    stream.getTracks().forEach((track) => track.stop());
                    // stream.getAudioTracks()[0].stop();
                    // stream.getVideoTracks()[0].stop();
                },
                function (error) {
                    console.log('getUserMedia() error', error);
                }
            );
        };
    }, []);

    useEffect(() => {
        myPeerRef.current!.on('open', () => {
            socketRef.current!.emit('join', { user, roomId });
        });
    }, []);

    // TODO REMOVE EVENT LISTENERS
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
            {!loading && <Chat socket={socketRef.current!} />}
        </RoomContainer>
    );
};

const mapStateToProps = (state: any) => ({
    user: state.user,
});

export default connect(mapStateToProps)(Room);
