declare module 'express-serve-static-core' {
    export interface Request {
        user?: LoginForm | SignUpForm;
    }
}

export interface LoginForm {
    email: string;
    password: string;
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
}

export interface SignUpForm extends UserType {
    confirmPassword: string;
}

export type CreateJWTType = (user: UserType) => void;
