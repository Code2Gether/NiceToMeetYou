import React from 'react';
import Header from './components/Header/Header';
import { Route, Switch } from 'react-router-dom';
import { theme } from './css/theme';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import { connect } from 'react-redux';
import { UserReducer, AppProps } from './utils/types/types';
import { removeUser } from './redux/users';

const App: React.FC<AppProps> = ({ user, setUser, removeUser }) => {
    const handleLogout = () => {
        removeUser();
    };

    return (
        <div className="App">
            <Header />
            <h1>Hello World</h1>
            <Login />
            <SignUp />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch: any) => ({
    removeUser: () => dispatch(removeUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
