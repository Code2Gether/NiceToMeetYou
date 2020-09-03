import React from 'react';
import Header from './components/Header/Header';
import { Route, Switch } from 'react-router-dom';
import { theme } from './css/theme';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import { connect } from 'react-redux';
import { UserReducer, AppProps } from './utils/types/types';

const App: React.FC<AppProps> = ({ user, setUser }) => {
    console.log(user);
    return (
        <div className="App">
            <Header />
            <h1>Hello World</h1>
            <Login />
            <SignUp />
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    user: state.user,
});

export default connect(mapStateToProps)(App);
