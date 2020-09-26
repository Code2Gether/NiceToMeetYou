import express, { Request, Response } from 'express';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';

require('./src/config/database');
const app = express();
export const http = require('http').Server(app);
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(http, {
    debug: true,
});

console.log(process.env.SEND_GRID_KEY);

app.use(cors());
require('./socket');
app.use('/peerjs', peerServer);
app.use(logger('dev'));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use('/api/users', require('./src/routes/users'));
app.use('/api/rooms', require('./src/routes/rooms'));

app.get('/*', (req: Request, res: Response) => {
    res.status(404).json({ message: "Path doesn't exist" });
});

export default app;
