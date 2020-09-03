import { combineReducers, applyMiddleware, createStore } from 'redux';
import userReducer from './redux/users';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';

const reducers = combineReducers({
    user: userReducer,
});
const middlewares = [ReduxThunk, logger];
const store = createStore(reducers, applyMiddleware(...middlewares));

export default store;
