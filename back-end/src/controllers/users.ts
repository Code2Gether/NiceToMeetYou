import { RequestHandler } from 'express';
import { User } from '../models/user';
import { createJWT } from '../middlewares/auth';
import { isEmail } from 'validator';
import { LoginForm, SignUpForm, UserType } from '../utils/types';

const loginUser: RequestHandler = async (req, res) => {
    const form: LoginForm = req.body;

    if (!isEmail(form.email) || form.password.length < 7)
        return res.status(400).json({ message: 'Invalid credentials' });

    try {
        const user: UserType = await User.findOne({ email: form.email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.comparePassword(form.password, async (error, isMatch) => {
            if (isMatch) {
                const token = await createJWT(user);
                return res.json(token);
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
        const newUser: UserType = await new User(form);
        await newUser.save();
        const token = await createJWT(newUser);
        res.status(201).json(token);
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
    signUpUser,
    loginUser,
    deleteProfile,
    updateProfile,
    userProfile,
};
