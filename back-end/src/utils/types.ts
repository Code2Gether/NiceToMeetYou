declare module 'express-serve-static-core' {
    export interface Request {
        user?: LoginForm | SignUpForm;
    }
}

export interface LoginForm {
    email: string;
    password: string;
    _id?: string;
}

export interface UserType extends LoginForm {
    firstName: string;
    lastName: string;
    comparePassword: (
        tryPassword: string,
        callback: (_, isMatch: boolean) => void
    ) => void;
    save: () => void;
    _id?: string;
    token?: string | null;
    isVerified?: boolean;
}

export interface SignUpForm extends UserType {
    confirmPassword: string;
}

export type CreateJWTType = (user: UserType) => void;

export interface User {
    user: {
        _id: string;
        firstName: string;
        lastName: string;
    }
}

export interface SocketJoinDisconnect extends User {
    roomId: string;
}

export interface SocketMessage extends User {
    message: string;
}