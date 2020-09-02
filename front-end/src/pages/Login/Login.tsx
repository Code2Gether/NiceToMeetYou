import React, { useState, ChangeEvent } from 'react';

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

    const handleSubmit = () => {
        //handle the submit to DB
        console.log('submited', form);
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    {' '}
                    Email
                    <input type="email" name="email" onChange={handleChange} />
                </label>
                <label>
                    {' '}
                    Password
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                    />
                </label>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
};

export default Login;
