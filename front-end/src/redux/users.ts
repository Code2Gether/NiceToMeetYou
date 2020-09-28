import { UserReducer, LoginFormProps } from '../utils/types/types';
import tokenService from '../utils/api/tokenService';
import { Action, ActionCreator } from 'redux';
import reqService from '../utils/api/reqService';

const REMOVE_USER = 'REMOVE_USER';
const LOGIN_USER = 'LOGIN_USER';

export const removeUser: ActionCreator<Action> = () => ({
    type: REMOVE_USER,
});

export const loginUser = (data: LoginFormProps) => {
    return async (dispatch: any) => {
        try {
            const token = await reqService.loginUser(
                `https://${process.env.REACT_APP_SERVER_URL}/api/users/login`,
                data
            );

            tokenService.setToken(token);

            dispatch({
                type: LOGIN_USER,
            });
        } catch (error) {
            throw new Error(error.message);
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
        case REMOVE_USER:
            tokenService.removeToken();
            return null;
        default:
            return state;
    }
}

export default userReducer;
