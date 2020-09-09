import React, { useState, ChangeEvent, FormEvent, MouseEvent } from 'react';
import InputComponent from '../../components/ui-components/InputComponent/InputComponent';
import ButtonComponent from '../../components/ui-components/ButtonComponent/ButtonComponent';
import { SignUpFormProps, SignUpProps } from '../../utils/types/types';
import {
    SignUpPage,
    SignUpTitle,
    SignUpForm,
    SignUpButtonContainer,
} from './SignUp.styles';
import { theme } from '../../css/theme';
import { Link } from 'react-router-dom';
import { signUpUser } from '../../utils/api/userService';

const SignUp: React.FC = () => {
    const [form, setForm] = useState<SignUpFormProps>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        message: '',
    });

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [evt.target.name]: evt.target.value,
        });
    };

    const handleSubmit = async (evt: FormEvent | MouseEvent) => {
        evt.preventDefault();
        try {
            const response = await signUpUser(form);
            setForm({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                message: response.message,
            });
        } catch (error) {
            setForm({
                ...form,
                message: error.message,
            });
        }
    };

    return (
        <SignUpPage>
            <SignUpTitle>Sign Up</SignUpTitle>
            <SignUpForm className="sign-up-form" onSubmit={handleSubmit}>
                <InputComponent
                    onChange={handleChange}
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    required={true}
                />
                <InputComponent
                    onChange={handleChange}
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    required={true}
                />
                <InputComponent
                    onChange={handleChange}
                    name="email"
                    type="email"
                    placeholder="Email"
                    required={true}
                />
                <InputComponent
                    onChange={handleChange}
                    name="password"
                    type="password"
                    placeholder="Password"
                    required={true}
                />
                <InputComponent
                    onChange={handleChange}
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    required={true}
                />
                <SignUpButtonContainer>
                    <ButtonComponent
                        fontSize={2}
                        width={10}
                        height={4}
                        disabled={false}
                        color={theme.colors.white}
                        bgColor={theme.colors.green['400']}
                    >
                        <Link to="/login">Login</Link>
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
                </SignUpButtonContainer>
            </SignUpForm>
            <div>{form.message}</div>
        </SignUpPage>
    );
};

export default SignUp;
