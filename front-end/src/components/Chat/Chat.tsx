import React, { useState, useRef, ChangeEvent, useEffect, MouseEvent, MutableRefObject } from "react";
import { useParams } from "react-router-dom";
import InputComponent from '../ui-components/InputComponent/InputComponent';
import ButtonIconComponent from '../ui-components/ButtonIconComponent/ButtonIconComponent';
import { ChatContainer, ChatMessagesContainer, ChatControllers } from "./Chat.styles";
import { theme } from '../../css/theme';
import io from "socket.io-client";
import { connect } from "react-redux";
import { Message, ChatMessagesProps, ChatProps, ChatUsersProps, ChatRoomData } from "../../utils/types/types";

const Chat: React.FC<ChatProps> = ({ user }) => {
    const socketRef: MutableRefObject<SocketIOClient.Socket | undefined> = useRef();
    const params: { id: string } = useParams();
    const roomId = params.id
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<ChatMessagesProps>([]);
    const [users, setUsers] = useState<ChatUsersProps>([]);
    const [error, setError] = useState('')

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setMessage(evt.target.value);
    };

    useEffect(() => {
        socketRef.current = io.connect("/");
        socketRef.current.emit('join', { user, roomId }, (error: any) => {            
            if (error) {
                setError(error)
            }
        })
    }, []);

    useEffect(() => {
        socketRef.current!.on("message", (message: Message) => {
            setMessages((messages) => [...messages, message]);
        });

        socketRef.current!.on("roomData", ({ room, users }: ChatRoomData) => {
            setUsers(users);
        });
    }, []);

    const handleSendMessage = (evt: MouseEvent) => {
        evt.preventDefault();
        if (message.length > 0) {
            socketRef.current!.emit('sendMessage', { message, user }, () => {
                setMessage('');
            })
        }
    }

    //TODO Add value to input
    return (
        <ChatContainer>
            <ChatMessagesContainer />
            <ChatControllers>
                <InputComponent name='message' type='text' placeholder='Enter your message' onChange={handleChange} label={false}/>
                <ButtonIconComponent
                    width={4}
                    height={4}
                    disabled={false}
                    fontSize={2}
                    bgColor={"transparent"}
                    color={theme.colors.grey[200]}
                    hoverColor={theme.colors.grey[400]}
                    onClick={handleSendMessage}
                    iconType={'paper-plane'}/>
            </ChatControllers>
        </ChatContainer>
    );
};

const mapStateToProps = (state: any) => ({
    user: state.user
})

export default connect(mapStateToProps)(Chat);
