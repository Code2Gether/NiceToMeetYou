import { LoginFormProps, SignUpFormProps } from '../../utils/types/types';
import reqService from './reqService';

export const signUpUser = async (data: SignUpFormProps) => {
    try {
        return await reqService.signUpUser('/api/users/signup', data);
    } catch (error) {
        throw new Error(error.message);
    }
};
