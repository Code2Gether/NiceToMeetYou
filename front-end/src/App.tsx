import React from 'react';
import Header from './components/Header/Header';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import Room from './pages/Room/Room';

const App: React.FC = () => {
    let location = useLocation();
    const locationNow = location.pathname.split('/')[1];

    return (
        <div className="App">
            {locationNow !== 'rooms' && <Header />}
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/rooms/:id" component={Room} />
                <Route render={() => <Redirect to={{ pathname: '/' }} />} />
            </Switch>
            {locationNow !== 'rooms' && <footer>Não esquecer o pezinho</footer>}
        </div>
    );
};

export default App;
