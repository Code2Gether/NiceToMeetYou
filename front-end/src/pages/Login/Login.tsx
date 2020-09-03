import React, { useState, ChangeEvent, FormEvent, MouseEvent } from 'react';
import InputComponent from '../../components/ui-components/InputComponent/InputComponent';
import ButtonComponent from '../../components/ui-components/ButtonComponent/ButtonComponent';
import {
    LoginTitle,
    LoginForm,
    LoginPage,
    LoginButtonContainer,
} from './Login.styles';
import {
    LoginFormProps,
    LoginProps,
    UserReducer,
} from '../../utils/types/types';
import { theme } from '../../css/theme';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/users';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

const Login: React.FC<LoginProps> = ({ loginUser }) => {
    const [form, setForm] = useState<LoginFormProps>({
        email: '',
        password: '',
    });

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [evt.target.name]: evt.target.value,
        });
    };

    const handleSubmit = (evt: FormEvent | MouseEvent) => {
        evt.preventDefault();
        loginUser(form);
    };

    return (
        <LoginPage>
            <LoginTitle>Login</LoginTitle>
            <LoginForm onSubmit={handleSubmit}>
                <InputComponent
                    onChange={handleChange}
                    name="email"
                    type="text"
                    placeholder="Email"
                />
                <InputComponent
                    onChange={handleChange}
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <LoginButtonContainer>
                    <ButtonComponent
                        fontSize={2}
                        width={10}
                        height={4}
                        disabled={false}
                        color={theme.colors.white}
                        bgColor={theme.colors.green['400']}
                    >
                        <Link to="/signup">Sign Up</Link>
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

const mapDispatchToProps = (dispatch: any) => ({
    loginUser: (data: LoginFormProps) => dispatch(loginUser(data)),
});

export default connect(null, mapDispatchToProps)(Login);
