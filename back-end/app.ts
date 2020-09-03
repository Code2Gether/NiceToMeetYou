import express, { Request, Response } from 'express';
import logger from 'morgan';

require('./src/config/database');
const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use('/api/users', require('./src/routes/users'));

app.get('/*', (req: Request, res: Response) => {
    res.status(404).json({ message: "Path doesn't exist" });
});

export default app;
