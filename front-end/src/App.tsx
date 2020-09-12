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
                <Route render={() => <Redirect to={{ pathname: '/' }} />} />
            </Switch>
            <Room />
            <ButtonIconComponent
                width={4}
                height={4}
                disabled={false}
                fontSize={2}
                bgColor={theme.colors.grey[200]}
                color={'indianred'}
                onClick={() => {
                    console.log('Exit');
                }}
                iconType={'times-circle'}
            />
            <ButtonIconComponent
                width={4}
                height={4}
                disabled={false}
                fontSize={2}
                bgColor={theme.colors.grey[200]}
                color={theme.colors.grey[400]}
                onClick={() => {
                    console.log('Video On');
                }}
                iconType={'video'}
            />
            <ButtonIconComponent
                width={4}
                height={4}
                disabled={false}
                fontSize={2}
                bgColor={theme.colors.grey[200]}
                color={theme.colors.grey[400]}
                onClick={() => {
                    console.log('Video Off');
                }}
                iconType={'video-slash'}
            />
            <ButtonIconComponent
                width={4}
                height={4}
                disabled={false}
                fontSize={2}
                bgColor={theme.colors.grey[200]}
                color={theme.colors.grey[400]}
                onClick={() => {
                    console.log('Mic On');
                }}
                iconType={'microphone-alt'}
            />
            <ButtonIconComponent
                width={4}
                height={4}
                disabled={false}
                fontSize={2}
                bgColor={theme.colors.grey[200]}
                color={theme.colors.grey[400]}
                onClick={() => {
                    console.log('Mic Off');
                }}
                iconType={'microphone-alt-slash'}
            />
            <footer>Não esquecer o pezinho</footer>
        </div>
    );
};

export default App;
