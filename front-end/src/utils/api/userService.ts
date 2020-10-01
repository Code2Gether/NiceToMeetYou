import { SignUpFormProps } from '../../utils/types/types';
import reqService from './reqService';

const http =
    +process.env.REACT_APP_SERVER_PORT! === 3001 ? 'http://' : '${http}';
const url = process.env.REACT_APP_SERVER_URL!;

export const signUpUser = async (data: SignUpFormProps) => {
    try {
        return await reqService.signUpUser(
            `${http}${url}/api/users/signup`,
            data
        );
    } catch (error) {
        throw new Error(error.message);
    }
};

export const resendVerifyEmail = async (email: {}) => {
    try {
        return await reqService.resendEmail(
            `${http}${url}/api/users/verify-email/resendEmailTokenId`,
            email
        );
    } catch (error) {
        throw new Error(error.message);
    }
};
