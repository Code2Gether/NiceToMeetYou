import { SignUpFormProps } from '../../utils/types/types';
import reqService from './reqService';

export const signUpUser = async (data: SignUpFormProps) => {
    try {
        const url = process.env.SERVER_URL_LOCAL || process.env.SERVER_URL;
        return await reqService.signUpUser(
            `${process.env.REACT_APP_SERVER_URL}/api/users/signup`,
            data
        );
    } catch (error) {
        throw new Error(error.message);
    }
};

export const resendVerifyEmail = async (email: {}) => {
    try {
        const url = process.env.SERVER_URL_LOCAL || process.env.SERVER_URL;
        return await reqService.resendEmail(
            `${process.env.REACT_APP_SERVER_URL}/api/users/verify-email/resendEmailTokenId`,
            email
        );
    } catch (error) {
        throw new Error(error.message);
    }
};
