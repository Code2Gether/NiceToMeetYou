import React from 'react';
import Header from './components/Header/Header';
import InputComponent from './components/ui-components/InputComponent';
import ButtonComponent from './components/ui-components/ButtonComponent';
import { Route, Switch } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <div className="App">
            <Header />
            <h1>Hello World</h1>
            <InputComponent
                name={'firstName'}
                type={'text'}
                placeholder={'First Name'}
            />
            <InputComponent
                name={'lastName'}
                type={'text'}
                placeholder={'Last Name'}
            />
            <InputComponent
                name={'email'}
                type={'text'}
                placeholder={'E-mail'}
            />
            <ButtonComponent
                fontSize={2}
                width={10}
                height={4}
                disabled={false}
                color={'white'}
                bgColor={'red'}
            >
                Cancel
            </ButtonComponent>
            <ButtonComponent
                fontSize={2}
                width={10}
                height={4}
                disabled={false}
                color={'white'}
                bgColor={'green'}
            >
                OK
            </ButtonComponent>
        </div>
    );
};

export default App;
