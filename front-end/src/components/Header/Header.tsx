import React, { ChangeEvent, useState, useRef } from 'react';
import { Nav, NavLink, LogoDiv } from './Header.styles';
import { connect } from 'react-redux';
import { HeaderProps } from '../../utils/types/types';
import { removeUser } from '../../redux/users';
import ModalComponent from '../ui-components/ModalComponent/ModalComponent';
import InputComponent from '../ui-components/InputComponent/InputComponent';
import { createRoom } from '../../utils/api/roomService';
import { useHistory } from 'react-router-dom';

const Header: React.FC<HeaderProps> = ({ user, removeUser }) => {
    const history = useHistory();
    const location = window.location.href;
    const [isOpen, setIsOpen] = useState(false);
    const [joinModal, setJoinModal] = useState(false);
    const [roomId, setRoomId] = useState('');
    const [form, setForm] = useState({
        password: '',
        confirmPassword: '',
    });

    const handleLogout = () => {
        removeUser();
    };

    const handleChange = ({
        target: { name, value },
    }: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleCreateRoom = async () => {
        try {
            const data = await createRoom(form);
            setRoomId(data.roomId);
            setForm({ password: '', confirmPassword: '' });
            setIsOpen(false);
            setJoinModal(true);
        } catch (error) {
            // TODO Create error pop-up
            console.log(error);
        }
    };

    const handleCancel = () => {
        setIsOpen(false);
        setForm({ password: '', confirmPassword: '' });
    };

    const handleJoinModalOk = () => {
        setJoinModal(false);
        history.push(`/rooms/${roomId}`);
    };

    const menu =
        user && user.firstName !== '' ? (
            <>
                <NavLink onClick={() => setIsOpen(true)}>Create Room</NavLink>
                <NavLink onClick={handleLogout}>Logout</NavLink>
            </>
        ) : (
            <>
                <NavLink href="/signup">Sign Up</NavLink>
                <NavLink href="/login">Login</NavLink>
            </>
        );

    const isValid = () => {
        return !(
            form.password.length > 1 && form.password === form.confirmPassword
        );
    };

    joinModal && navigator.clipboard.writeText(`${location}join/${roomId}`);

    return (
        <Nav>
            <LogoDiv>IMAGEM</LogoDiv>
            {menu}
            {isOpen && (
                <ModalComponent
                    btnText="Confirm"
                    handleOk={handleCreateRoom}
                    handleCancel={handleCancel}
                    text="Choose the room password."
                    okBtnDisabled={isValid}
                >
                    <InputComponent
                        onChange={handleChange}
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        required={true}
                    />
                    <InputComponent
                        onChange={handleChange}
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        required={true}
                    />
                </ModalComponent>
            )}
            {joinModal && (
                <ModalComponent
                    btnText="Ok"
                    handleOk={handleJoinModalOk}
                    text="Copy the link below and send to your friend."
                    secondText={`${location}join/${roomId}`}
                    okBtnDisabled={() => false}
                />
            )}
        </Nav>
    );
};

const mapStateToProps = (state: any) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch: any) => ({
    removeUser: () => dispatch(removeUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
