import React from 'react';
import Header from './components/Header/Header';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import Room from './pages/Room/Room';
import ButtonIconComponent from './components/ui-components/ButtonIconComponent/ButtonIconComponent';
import { theme } from './css/theme';

const App: React.FC = () => {
    return (
        <div className="App">
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/rooms/:id" component={Room} />
                <Route render={() => <Redirect to={{ pathname: '/' }} />} />
            </Switch>
            <footer>Não esquecer o pezinho</footer>
        </div>
    );
};

export default App;
