import express from 'express';
import logger from 'morgan';

require('./src/config/database');
const app = express();

app.use(logger('dev'));
app.use(express.json());

app.get('/*', (req, res) => {
    res.status(404).json({ message: "Path doesn't exist" });
});

export default app;
