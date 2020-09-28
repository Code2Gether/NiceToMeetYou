import React, {
    useState,
    ChangeEvent,
    FormEvent,
    MouseEvent,
    useEffect,
} from 'react';
import InputComponent from '../../components/ui-components/InputComponent/InputComponent';
import ButtonComponent from '../../components/ui-components/ButtonComponent/ButtonComponent';
import ModalComponent from '../../components/ui-components/ModalComponent/ModalComponent';
import ButtonWrapper from '../../components/ui-components/ButtonWrapper/ButtonWrapper';
import ErrorMessage from '../../components/ui-components/ErrorMessage/ErrorMessage';
import { LoginTitle, LoginForm, LoginPage } from './Login.styles';
import { LoginFormProps, LoginProps } from '../../utils/types/types';
import { theme } from '../../css/theme';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/users';
import { resendVerifyEmail } from '../../utils/api/userService';

const Login: React.FC<LoginProps> = ({ loginUser }) => {
    const history = useHistory();
    const [showMsg, setShowMsg] = useState<boolean>(false);
    const [resend, setResend] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [emailModal, setEmailModal] = useState("");
    const [form, setForm] = useState<LoginFormProps>({
        email: '',
        password: '',
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
        if (name === 'emailModal') setEmailModal(value)
        else
            setForm({
                ...form,
                [name]: value,
            });
    };

    const handleSubmit = async (evt: FormEvent | MouseEvent) => {
        evt.preventDefault();
        try {
            await loginUser(form);

            setForm({ email: '', password: '', message: '', errorFlag: false });
            setShowMsg(true);
            history.push('/');
        } catch (error) {
            if (error.message.slice(0, 6) === 'Please') {
                setResend(true);
            }
            setForm({ ...form, message: error.message, errorFlag: true });
            setShowMsg(true);
        }
    };

    const handleModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        try {
            await resendVerifyEmail({ email: emailModal });
        } catch (error) {
            // TODO Handle login error
            console.log(error);
        }
    };

    const handleClose = () => setOpen(false);

    return (
        <LoginPage>
            <LoginTitle>Login</LoginTitle>
            <LoginForm onSubmit={handleSubmit}>
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
                <ButtonWrapper>
                    <Link to="/signup">
                        <ButtonComponent
                            fontSize={2}
                            width={10}
                            height={4}
                            disabled={false}
                            color={theme.colors.white}
                            bgColor={theme.colors.green['400']}
                        >
                            Sign Up
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
            </LoginForm>
            {showMsg && (
                <ErrorMessage
                    msg={form.message}
                    iconType={resend ? 'envelope' : 'exclamation-triangle'}
                    color={theme.colors.red}
                />
            )}
            {resend && (
                <ButtonComponent
                    fontSize={1}
                    width={21.5}
                    height={3}
                    disabled={false}
                    color={theme.colors.white}
                    bgColor={theme.colors['red']}
                    onClick={handleModal}
                >
                    Resend Email Verification
                </ButtonComponent>
            )}
            {open && (
                <ModalComponent
                    text="Add your email below."
                    btnText="Resend"
                    handleCancel={handleClose}
                    handleOk={handleOk}
                    okBtnDisabled={() => false}
                >
                    <InputComponent
                        onChange={handleChange}
                        name="emailModal"
                        type="email"
                        placeholder="Email"
                        value={emailModal}
                        required={true}
                    />
                </ModalComponent>
            )}
        </LoginPage>
    );
};

const mapDispatchToProps = (dispatch: any) => ({
    loginUser: (data: LoginFormProps) => dispatch(loginUser(data)),
});

export default connect(null, mapDispatchToProps)(Login);
