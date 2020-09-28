import React from 'react';
import Header from './components/Header/Header';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import Room from './pages/Room/Room';
import { connect } from "react-redux";
import { AppAndRoomProps } from './utils/types/types';

const App: React.FC<AppAndRoomProps> = ({user}) => {
    let location = useLocation();
    const locationNow = location.pathname.split('/')[1];

    const route = user && user.firstName ?
        (<Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms/:id" component={Room} />
        <Route render={() => <Redirect to={{ pathname: '/' }} />} />
        </Switch>) 
    :
        (<Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route render={() => <Redirect to={{ pathname: '/login' }} />} />
        </Switch>);

    return (
        <div className="App">
            {locationNow !== 'rooms' && <Header />}
            {route}
            {locationNow !== 'rooms' && <footer>Não esquecer o pezinho</footer>}
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    user: state.user
})

export default connect(mapStateToProps)(App);
