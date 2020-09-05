import { RequestHandler } from 'express';

const create: RequestHandler = async (req, res) => {
    res.send('_id');
};

const join: RequestHandler = async (req, res) => {
    res.send('Join');
};

export const roomCtrl = {
    create,
    join,
};
