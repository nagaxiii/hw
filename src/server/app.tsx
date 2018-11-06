import axios from 'axios';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import mongoose from 'mongoose';
import routes from './routes';
import template from './template';
import App from '../client/App';
import createStore from '../client/store';
const config = dotenv.config();

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(
        process.env.MONGODB_URL || 'mongodb://localhost:27017/d_hw',
        { useNewUrlParser: true },
        err => err && console.error(err)
    );
    mongoose.connection.on('error', () => {
        console.error('Something went wrong.');
    });
    mongoose.connection.once('open', () => {
        console.log('Connected to DB.');
    });
}

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/ping', (req, res) => res.send('pong'));

app.use('/api/v1/glossary', routes);

app.get('/api/v1/glosbe', async (req, res) => {
    try {
        const results = await axios.get(
            `https://glosbe.com/gapi/translate?from=en&dest=de&format=json&phrase=${req.query.english}&pretty=true`
        );
        res.send(results.data);
    } catch (err) {
        res.status(500).send();
    }
});

app.get('/', (req, res) => {
    const store = createStore();

    const app = renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    );

    const state = JSON.stringify(store.getState()).replace(/</g, '\\u003c');

    res.type('html')
        .status(200)
        .send(template(app, state));
});

export default app;
