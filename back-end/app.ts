import express, { Request, Response } from 'express';
import path from 'path';
import logger from 'morgan';
import { peerServer } from './socket';

require('./src/config/database');
const app = express();
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
