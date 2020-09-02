import React, { useState } from 'react';
import { SignUpForm } from '../../utils/types/types';
import { SignUpDiv } from './SignUp.styles';

const SignUp: React.FC = () => {
    const [form, setForm] = useState<SignUpForm>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = () => {
        // Submit form -> Redux thunk -> backend
    };

    return (
        <div>
            <h1>SignUp</h1>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <div className="sign-up-form__header">Form Header</div>
                <SignUpDiv className="sign-up-form__body">
                    <input type="text" className="sign-up-form__input" />
                    <label
                        htmlFor="firstName"
                        className="sign-up-form__label"
                    ></label>
                </SignUpDiv>
            </form>
        </div>
    );
};

export default SignUp;
