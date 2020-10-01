import React, { ChangeEvent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as roomService from '../../utils/api/roomService';
import { JoinRoomPage } from './JoinRoom.styles';
import InputComponent from '../../components/ui-components/InputComponent/InputComponent';
import ModalComponent from '../../components/ui-components/ModalComponent/ModalComponent';

const JoinRoom: React.FC = () => {
    const history = useHistory();
    const { id: roomId }: { id: string } = useParams();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleChange = ({
        target: { value },
    }: ChangeEvent<HTMLInputElement>) => {
        setPassword(value);
    };

    const handleSendPassword = async () => {
        try {
            const join = await roomService.joinRoom({
                password,
                roomId,
            });
            console.log(join);
            if (join) history.push(`/rooms/${roomId}`);
        } catch (error) {
            // TODO deal with the error
            console.log(error.message);
            setErrorMessage(error.message);
        }
    };

    const isValid = () => !(password.length >= 7);

    const handleClose = () => history.push('/');

    return (
        <div>
            <ModalComponent
                text="Add the password below."
                btnText="Send"
                handleCancel={handleClose}
                handleOk={handleSendPassword}
                okBtnDisabled={isValid}
                errorMessage={errorMessage}
            >
                <InputComponent
                    onChange={handleChange}
                    name="password"
                    type="password"
                    placeholder="password"
                    value={password}
                    required={true}
                />
            </ModalComponent>
            <h1>JoinRoom</h1>
            <JoinRoomPage />
        </div>
    );
};

export default JoinRoom;
