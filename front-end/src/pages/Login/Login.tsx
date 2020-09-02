import React, { useState, ChangeEvent, FormEvent, MouseEvent } from "react";
import InputComponent from '../../components/ui-components/InputComponent';
import ButtonComponent from '../../components/ui-components/ButtonComponent';
import { LoginTitle, LoginForm, LoginPage, LoginButtonContainer } from './Login.styles';
import { theme } from '../../css/theme';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
    const initialState = {
        email: '',
        password: '',
    };

    const [form, setForm] = useState(initialState);

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [evt.target.name]: evt.target.value,
        });
    };

    const handleSubmit = (evt: FormEvent | MouseEvent) => {
        evt.preventDefault();
        //handle the submit to DB
        console.log("submit", form);
    };

    return (
        <LoginPage>
            <LoginTitle>Login</LoginTitle>
            <LoginForm onSubmit={handleSubmit}>
                <InputComponent onChange={handleChange} name='email' type='text' placeholder='Email'/>
                <InputComponent onChange={handleChange} name='password' type='password' placeholder='Password' />
                <LoginButtonContainer>
                    <ButtonComponent
                        fontSize={2}
                        width={10}
                        height={4}
                        disabled={false}
                        color={theme.colors.white}
                        bgColor={theme.colors.green['400']}
                        >
                            <Link to='/signup'>
                                Sign Up
                            </Link>
                    </ButtonComponent>
                    <ButtonComponent
                        fontSize={2}
                        width={10}
                        height={4}
                        disabled={false}
                        color={theme.colors.white}
                        bgColor={theme.colors.green['100']}
                        onClick={handleSubmit}
                    >
                                Submit
                    </ButtonComponent>
                </LoginButtonContainer>
            </LoginForm>
        </LoginPage>
    );
};

export default Login;
