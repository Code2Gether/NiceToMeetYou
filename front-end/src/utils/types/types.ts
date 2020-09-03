import React, { HTMLAttributes, ChangeEvent } from 'react';
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
}

export interface LoginProps {
    loginUser: (data: LoginFormProps) => void;
}

export interface LoginFormProps {
    email: string;
    password: string;
}

export interface InputComponentProps {
    name: string;
    type: string;
    placeholder: string;
    required: boolean;
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
}

export interface AppProps {
    user: UserProps;
    removeUser: () => void;
    setUser: (data: UserReducer) => void;
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
