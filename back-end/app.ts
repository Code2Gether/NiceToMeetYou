import express, { Request, Response } from 'express';
import logger from 'morgan';

require('./src/config/database');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(http, {
    debug: true,
});

app.use('/peerjs', peerServer);
app.use(logger('dev'));
app.use(express.json());

app.use('/api/users', require('./src/routes/users'));
app.use('/api/rooms', require('./src/routes/rooms'));

app.get('/*', (req: Request, res: Response) => {
    res.status(404).json({ message: "Path doesn't exist" });
});

export default app;
