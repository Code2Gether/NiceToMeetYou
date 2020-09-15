import React, {
    useState,
    ChangeEvent,
    FormEvent,
    MouseEvent,
    useEffect,
} from 'react';
import InputComponent from '../../components/ui-components/InputComponent/InputComponent';
import ButtonComponent from '../../components/ui-components/ButtonComponent/ButtonComponent';
import ButtonWrapper from '../../components/ui-components/ButtonWrapper/ButtonWrapper';
import ErrorMessage from '../../components/ui-components/ErrorMessage/ErrorMessage';
import { SignUpFormProps } from '../../utils/types/types';
import { SignUpPage, SignUpTitle, SignUpForm } from './SignUp.styles';
import { theme } from '../../css/theme';
import { Link } from 'react-router-dom';
import { signUpUser } from '../../utils/api/userService';

const SignUp: React.FC = () => {
    const [showMsg, setShowMsg] = useState<boolean>(false);
    const [form, setForm] = useState<SignUpFormProps>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        message: '',
        errorFlag: false,
    });

    useEffect(() => {
        setTimeout(() => {
            setShowMsg(false);
        }, 10000);
    }, [form.message]);

    const handleChange = ({
        target: { name, value },
    }: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [name]: value,
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
                errorFlag: false,
            });
            setShowMsg(true);
        } catch (error) {
            setForm({
                ...form,
                message: error.message,
                errorFlag: true,
            });
            setShowMsg(true);
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
                    value={form.firstName}
                    required={true}
                />
                <InputComponent
                    onChange={handleChange}
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={form.lastName}
                    required={true}
                />
                <InputComponent
                    onChange={handleChange}
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    required={true}
                />
                <InputComponent
                    onChange={handleChange}
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    required={true}
                />
                <InputComponent
                    onChange={handleChange}
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    required={true}
                />
                <ButtonWrapper>
                    <Link to="/login">
                        <ButtonComponent
                            fontSize={2}
                            width={10}
                            height={4}
                            disabled={false}
                            color={theme.colors.white}
                            bgColor={theme.colors.green['400']}
                        >
                            Login
                        </ButtonComponent>
                    </Link>
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
                </ButtonWrapper>
            </SignUpForm>
            {showMsg && (
                <ErrorMessage
                    msg={form.message}
                    iconType={
                        !form.errorFlag ? 'envelope' : 'exclamation-triangle'
                    }
                    color={theme.colors.red}
                />
            )}
        </SignUpPage>
    );
};

export default SignUp;
