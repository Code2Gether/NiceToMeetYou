import React, { useState, ChangeEvent } from "react";
import InputComponent from '../ui-components/InputComponent/InputComponent';
import ButtonIconComponent from '../ui-components/ButtonIconComponent/ButtonIconComponent';
import { ChatContainer, ChatMessagesContainer, ChatControllers } from "./Chat.styles";
import { theme } from '../../css/theme';

const Chat: React.FC = () => {
    const [message, setMessage] = useState('')

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setMessage(evt.target.value);
    };

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
                    onClick={() => {
                        console.log('Send');
                    }}
                    iconType={'paper-plane'}/>
            </ChatControllers>
        </ChatContainer>
    );
};

export default Chat;
