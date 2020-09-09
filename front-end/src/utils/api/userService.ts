import { SignUpFormProps } from '../../utils/types/types';
import reqService from './reqService';

export const signUpUser = async (data: SignUpFormProps) => {
    try {
        return await reqService.signUpUser('/api/users/signup', data);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const resendVerifyEmail = async (email: {}) => {
    try {
        return await reqService.resendEmail(
            '/api/users/verify-email/resendEmailTokenId',
            email
        );
    } catch (error) {
        throw new Error(error.message);
    }
};
