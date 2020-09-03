import { User } from '../models/user';
import { createJWT } from '../middlewares/auth';
import { isEmail } from 'validator';

const loginUser = async (req, res) => {
    const form = req.body;
    
    if (
        !isEmail(form.email) ||
        form.password.length < 7
    ) return res.status(400).json({ message: 'Invalid credentials' });

    try {
        const user = await User.findOne({ email: form.email });
        if (!user) return res.status(404).json({message: 'User not found'})
        user.comparePassword(form.password, async (error, isMatch) => {
            if (isMatch) {
                const token = await createJWT(user)
                return res.json({token})
            }
            res.status(400).json({message: 'Wrong credentials'})
        })
    } catch (error) {
        res.status(500).json({message: 'Something went wrong', error});
    }
}

const signUpUser = async (req, res) => {
    const form = req.body;
    if (
        !form.firstName ||
        !form.lastName ||
        !isEmail(form.email) ||
        form.password.length < 7
    ) return res.status(400).json({ message: 'Invalid credentials' });
    
    try {
        const user = await User.findOne({email: form.email});
        if (user) return res.status(400).json({ message: 'Email already taken' });
        delete form.confirmPassword;
        const newUser = await new User(form)
        await newUser.save();
        const token = await createJWT(newUser);
        res.status(201).json({token})
    } catch (error) {
        res.status(500).json({message: 'Something went wrong', error});
    }
}

const userProfile = async (req, res) => {
    return res.json("user profile");
}


const deleteProfile = async (req, res) => {
    return res.json("delete profile");
}


const updateProfile = async (req, res) => {
    return res.json("update profile");
}

export const userCtrl = {
    signUpUser,
    loginUser,
    deleteProfile,
    updateProfile,
    userProfile
}
