import { createStore, applyMiddleware, Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { reducer, initialState } from './reducer';
import saga from './sagas';

export const sagaMiddleware = createSagaMiddleware();

let middleware = [sagaMiddleware as Middleware];
if (process.env.NODE_ENV !== 'production') {
    const loggerMiddleware = createLogger();
    middleware.push(loggerMiddleware);
}

const composeEnhancers = composeWithDevTools({});

export default (state = initialState) => {
    const store = createStore(reducer, state, composeEnhancers(applyMiddleware(...middleware)));

    // Start the sagas
    sagaMiddleware.run(saga);

    return store;
};
