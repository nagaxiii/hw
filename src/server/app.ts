import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import bodyParser from 'body-parser';
const config = dotenv.config();
const app = express();

app.use(bodyParser.json());

app.get('/ping', (req, res) => {
    return res.send('pong');
});

app.use('/api/v1/glossary', routes);

export default app;
