import appReducers from './reducers/index';
import { createStore, applyMiddleware, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


let store = createStore(
    appReducers,
    composeEnhancers(
        applyMiddleware(thunkMiddleware)
    )
);

