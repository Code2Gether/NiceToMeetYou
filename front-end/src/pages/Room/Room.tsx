import React, { useRef, useEffect, useCallback } from "react";
import io from "socket.io-client";
import Peer from 'peerjs';
import { connect } from "react-redux";
import Chat from '../../components/Chat/Chat';
import { RoomContainer, RoomVideoContainer, RoomVideo, RoomFooter, RoomHeader } from "./Room.styles";
import { RoomProps } from '../../utils/types/types';
import { useParams } from "react-router-dom";

// const MyVideoComponent = () => {
//     const videoRef = useRef(null)
//     return (<video ref={videoRef} muted={true}/>)
// }

interface Peers {
    [key: string]: Peer.MediaConnection;
}

interface Data {
    userId: string,
    text: string,
}

const Room: React.FC<RoomProps> = ({ user }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const params: { id: string } = useParams();
    const roomId = params.id;
    const socket = io('/');
    let myVideoStream;
    const peers: Peers = {};
    const myPeer = new Peer(user._id, {
        path: '/peerjs',
        host: '/',
        port: 3000
    });

        const myVideo = document.createElement("video");
            // React.createElement('video', { muted: true });
        
        const addVideoStream = useCallback((video: HTMLVideoElement, stream: MediaStream) => {
            video.srcObject = stream;
            video.addEventListener('loadedmetadata', () => video.play());
            if (containerRef.current) {
                containerRef.current!.appendChild(video);
            }
        }, [containerRef.current])

        const connectToNewUser = (userId: string, stream: MediaStream) => {
            const call = myPeer.call(userId, stream);
            const video = document.createElement('video');
            call.on('stream', userVideoStream => addVideoStream(video, userVideoStream))
            call.on('close', () => video.remove())
            peers[userId] = call;
        }
        
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(stream => {
            myVideoStream = stream;
            addVideoStream(myVideo, stream);
            myPeer.on('call', call => {
                call.answer(stream)
                const video = document.createElement("video");
                console.log('s', stream);
                call.on('stream', userVideoStream => {
                    console.log('u', userVideoStream)
                    return addVideoStream(video, userVideoStream)
                })
            });

            socket.on("user-connected", ({userId}: Data) =>
                connectToNewUser(userId, stream)
            );
        })

        socket.on('user-disconnected', ({userId}: Data) => {
            if (peers[userId]) peers[userId].close();
        });

        myPeer.on('open', () => {
            socket.emit("join", {user, roomId});
        });

    // useEffect(() => {
    //     return () => {
    //         const allChildNodes = containerRef.current?.childNodes
    //         allChildNodes?.forEach(node => node.removeEventListener('loadedmetadata', () => video.play()))
    //     }
    // }, [])

    return (
        <RoomContainer>
            <RoomHeader/>
            <RoomVideoContainer ref={containerRef}/>
            {/* allVideos.map(video => ReactDOM.render(video)) */}
            <RoomFooter />
            <Chat/>
        </RoomContainer>
    );
};

const mapStateToProps = (state: any) => ({
    user: state.user
})

export default connect(mapStateToProps)(Room);
