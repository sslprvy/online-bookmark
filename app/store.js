import appReducers from './reducers/index';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let appStore = createStore(
    appReducers,
    composeEnhancers(
        applyMiddleware(thunkMiddleware)
    )
);

export const dispatch = appStore.dispatch;
export let store = appStore;
