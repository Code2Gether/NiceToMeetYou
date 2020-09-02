import { HTMLAttributes } from 'react';

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
}

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    fontSize?: number;
    width?: number;
    height?: number;
    disabled?: boolean;
    color?: string;
    bgColor?: string;
}
