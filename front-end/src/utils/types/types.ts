import { HTMLAttributes, ChangeEvent } from 'react';
import { Color } from './cssTypes';

export interface SignUpProps {
    signUpUser: (data: SignUpFormProps) => void;
}

export interface SignUpFormProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    message: string;
    errorFlag: boolean;
}

export interface LoginProps {
    loginUser: (data: LoginFormProps) => void;
}

export interface LoginFormProps {
    email: string;
    password: string;
    message: string;
    errorFlag: boolean;
    setUser?: (data: UserReducer) => void;
}

export interface InputComponentProps {
    name: string;
    type: string;
    placeholder: string;
    required?: boolean;
    label?: boolean;
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    fontSize?: number;
    width?: number;
    height?: number;
    disabled?: boolean;
    color?: string | Color;
    bgColor?: string | Color;
}

export interface ButtonIconProps extends ButtonProps {
    iconType?: any;
    hoverColor?: string;
}

export interface UserReducer {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserProps {
    firstName: string;
    lastName: string;
    _id: string;
}

export interface HeaderProps {
    user: UserProps;
    removeUser: () => void;
}

export interface apiRequestHelperProps {
    type: string;
    url: string;
    data?: {};
}

export interface OptionProps {
    method: string;
    headers: {
        'Content-Type': string;
        Authorization: string;
    };
    body?: any;
}

export interface ModalProps {
    text: string;
    btnText: string;
    handleCancel: () => void;
    handleOk: (email: string) => void;
    input: boolean;
}

export interface ButtonWrapperProps {
    direction?: string;
}

export interface ErrorMessageProps {
    msg?: string;
    iconType?: any;
    color?: string;
}

export interface ChatProps {
    user: UserProps;
}

export interface Message {
    user: string;
    text: string;
}

export type ChatMessagesProps = Message[]

export type ChatUsersProps = UserProps[]

export interface ChatRoomData {
    room: string;
    users: ChatUsersProps;
}