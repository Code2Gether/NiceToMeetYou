import { RequestHandler, Request } from 'express';
import * as jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET_KEY;
import { CreateJWTType, UserType } from '../utils/types';

export const authJWT: RequestHandler = async (req, res, next) => {
    try {
        let token: string =
            req.get('Authorization') || req.query.token || req.body.token;

        if (token) {
            token = token.replace('Bearer ', '');
            const user = await jwt.verify(token, SECRET);
            if (!user)
                return res.status(400).json({ message: 'Not Authorized' });
            req.user = user;
            return next();
        }

        res.status(401).json({ message: 'Please authenticate first.' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

export const createJWT: CreateJWTType = (user: UserType) => {
    return jwt.sign(
        { _id: user._id, firstName: user.firstName, lastName: user.lastName },
        SECRET
    );
};
