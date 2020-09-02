import { HTMLAttributes, ChangeEvent } from 'react';
import { Color } from './cssTypes';

export interface SignUpForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface InputComponentProps {
    name: string;
    type: string;
    placeholder: string;
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
