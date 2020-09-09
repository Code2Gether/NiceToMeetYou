import { RequestHandler } from 'express';
import { User } from '../models/user';
import { createJWT } from '../middlewares/auth';
import { isEmail } from 'validator';
import { LoginForm, SignUpForm, UserType } from '../utils/types';
import sgMail from '@sendgrid/mail';
import * as crypto from 'crypto';

sgMail.setApiKey(process.env.SEND_GRID_KEY);

const createMsg = (user, host) => {
    return {
        from: process.env.SEND_GRID_EMAIL,
        to: user.email,
        subject: 'Nice2MeetU - Verify your email',
        html: `
                <h1>Hello ${user.firstName}</h1>
                <p>Thanks for registering on our website.</p>
                <a href="http://${host}/api/users/verify-email/${user.token}">Click here to verify</a>
            `,
    };
};

const verifyEmail: RequestHandler = async (req, res) => {
    try {
        const user: UserType = await User.findOne({
            token: req.params.emailTokenId,
        });
        if (!user) return res.status(404).json({ message: 'Invalid token.' });

        user.token = null;
        user.isVerified = true;
        await user.save();
        res.sendFile('index.html', {
            root: './src/views'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong with the account authentication.',
            error,
        });
    }
};

const resendVerifyEmail: RequestHandler = async (req, res) => {
    try {
        if (!isEmail(req.body.email))
            return res.status(400).json({ message: 'Invalid email' });
        const user: UserType = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (user.isVerified)
            return res.json({ message: 'Your account is already verified.' });
        const msg = createMsg(user, req.headers.host);
        await sgMail.send(msg);

        // TODO remove emailToken from testing
        return res.json({
            message: 'Please check your email to verify your account.',
            emailToken: user.token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

const loginUser: RequestHandler = async (req, res) => {
    const form: LoginForm = req.body;

    if (!isEmail(form.email) || form.password.length < 7)
        return res.status(400).json({ message: 'Invalid credentials' });

    try {
        const user: UserType = await User.findOne({ email: form.email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.comparePassword(form.password, async (error, isMatch) => {
            if (isMatch) {
                if (user.isVerified) {
                    const token = await createJWT(user);
                    return res.json(token);
                }

                return res
                    .status(403)
                    .json({ message: 'Please verify your email first.' });
            }
            res.status(400).json({ message: 'Wrong credentials' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

const signUpUser: RequestHandler = async (req, res) => {
    const form: SignUpForm = req.body;
    if (
        !form.firstName ||
        !form.lastName ||
        !isEmail(form.email) ||
        form.password.length < 7
    )
        return res.status(400).json({ message: 'Invalid credentials' });

    try {
        const user: UserType = await User.findOne({ email: form.email });
        if (user)
            return res.status(400).json({ message: 'Email already taken' });
        delete form.confirmPassword;
        form.token = crypto.randomBytes(64).toString('hex');
        const newUser: UserType = await new User(form);
        await newUser.save();
        const msg = createMsg(newUser, req.headers.host);
        await sgMail.send(msg);
        // TODO remove emailToken from testing
        res.status(201).json({
            message: 'Please check your email to verify your account.',
            emailToken: newUser.token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

const userProfile: RequestHandler = async (req, res) => {
    return res.json('user profile');
};

const deleteProfile: RequestHandler = async (req, res) => {
    return res.json('delete profile');
};

const updateProfile: RequestHandler = async (req, res) => {
    return res.json('update profile');
};

export const userCtrl = {
    verifyEmail,
    resendVerifyEmail,
    signUpUser,
    loginUser,
    deleteProfile,
    updateProfile,
    userProfile,
};
