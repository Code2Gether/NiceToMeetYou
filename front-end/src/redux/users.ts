import {
    UserReducer,
    LoginFormProps,
    SignUpFormProps,
} from '../utils/types/types';
import tokenService from '../utils/api/tokenService';
import { Action, ActionCreator, Dispatch } from 'redux';
import reqService from '../utils/api/reqService';

const REMOVE_USER = 'REMOVE_USER';
const LOGIN_USER = 'LOGIN_USER';
const SIGN_UP_USER = 'SIGN_UP_USER';

export const removeUser: ActionCreator<Action> = () => ({
    type: REMOVE_USER,
});

export const loginUser = (data: LoginFormProps) => {
    return async (dispatch: any) => {
        try {
            const token = await reqService.loginUser('/api/users/login', data);
            tokenService.setToken(token);

            dispatch({
                type: LOGIN_USER,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const signUpUser = (data: SignUpFormProps) => {
    return async (dispatch: Dispatch) => {
        try {
            const token = await reqService.signUpUser(
                '/api/users/signup',
                data
            );
            await tokenService.setToken(token);

            dispatch({
                type: SIGN_UP_USER,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

function userReducer(
    state = tokenService.getUserFromToken(),
    action: { type: string; payload: UserReducer }
) {
    switch (action.type) {
        case LOGIN_USER:
            return tokenService.getUserFromToken();
        case SIGN_UP_USER:
            return tokenService.getUserFromToken();
        case REMOVE_USER:
            tokenService.removeToken();
            return null;
        default:
            return state;
    }
}

export default userReducer;
