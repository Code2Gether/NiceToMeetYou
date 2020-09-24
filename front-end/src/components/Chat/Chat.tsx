import React, {
    useState,
    useRef,
    ChangeEvent,
    useEffect,
    MouseEvent,
    MutableRefObject,
    FormEvent,
} from 'react';
import { useParams } from 'react-router-dom';
import InputComponent from '../ui-components/InputComponent/InputComponent';
import ButtonIconComponent from '../ui-components/ButtonIconComponent/ButtonIconComponent';
import {
    ChatContainer,
    ChatMessagesContainer,
    ChatControllers,
    ChatMessagesUl,
    ChatMessagesLi,
} from './Chat.styles';
import { theme } from '../../css/theme';
import { connect } from 'react-redux';
import {
    Message,
    ChatMessagesProps,
    ChatProps,
    ChatUsersProps,
    ChatRoomData,
} from '../../utils/types/types';

const Chat: React.FC<ChatProps> = ({ user, socket }) => {
    const socketRef: MutableRefObject<
        SocketIOClient.Socket | undefined
    > = useRef();
    const { id: roomId }: { id: string } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<ChatMessagesProps>([]);
    const [users, setUsers] = useState<ChatUsersProps>([]);
    const [error, setError] = useState('');

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setMessage(evt.target.value);
    };

    useEffect(() => {
        socketRef.current = socket;
        socketRef.current.emit('join', { user, roomId }, (error: any) => {
            if (error) {
                setError(error);
            }
        });
    }, []);

    useEffect(() => {
        socketRef.current!.on('message', (message: Message) => {
            setMessages((messages) => [...messages, message]);
        });
        socketRef.current!.on('user-connected', (message: Message) => {
            setMessages((messages) => [...messages, message]);
        });

        socketRef.current!.on('roomData', ({ room, users }: ChatRoomData) => {
            setUsers(users);
        });
    }, []);

    const handleSendMessage = (evt: MouseEvent | FormEvent) => {
        evt.preventDefault();
        if (message.length > 0) {
            socketRef.current!.emit('sendMessage', { message, user }, () =>
                setMessage('')
            );
        }
    };

    // TODO check joined the room page message logic not to show []
    // TODO create styled p and pass direction logic
    return (
        <ChatContainer>
            <ChatMessagesContainer>
                <ChatMessagesUl>
                    {messages.map((msg, idx) => {
                        let direction = 'left';
                        if (msg.userId === user._id) {
                            direction = 'right';
                            return (
                                <ChatMessagesLi key={idx} direction={direction}>
                                    <p>
                                        {msg.user} [{msg.createdAt}]
                                    </p>
                                    {msg.text}
                                </ChatMessagesLi>
                            );
                        } else {
                            return (
                                <ChatMessagesLi key={idx} direction={direction}>
                                    <p>
                                        [{msg.createdAt}] {msg.user}
                                    </p>
                                    {msg.text}
                                </ChatMessagesLi>
                            );
                        }
                    })}
                </ChatMessagesUl>
            </ChatMessagesContainer>
            <ChatControllers>
                <form onSubmit={handleSendMessage}>
                    <InputComponent
                        name="message"
                        type="text"
                        placeholder="Enter your message"
                        onChange={handleChange}
                        value={message}
                        label={false}
                    />
                    <ButtonIconComponent
                        width={4}
                        height={4}
                        disabled={false}
                        fontSize={2}
                        bgColor={'transparent'}
                        color={theme.colors.grey[200]}
                        hoverColor={theme.colors.grey[400]}
                        onClick={handleSendMessage}
                        iconType={'paper-plane'}
                    />
                </form>
            </ChatControllers>
        </ChatContainer>
    );
};

const mapStateToProps = (state: any) => ({
    user: state.user,
});

export default connect(mapStateToProps)(Chat);
