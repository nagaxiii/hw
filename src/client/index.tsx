import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import createStore from './store';

const store = createStore((window as any).__REDUX_DATA);
const app = document.getElementById('app');
ReactDOM.hydrate(
    <Provider store={store}>
        <App />
    </Provider>,
    app
);
