import React from 'react';
import ReactDom from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import List from './components/list';
import appReducers from './reducers/index';
import { fetchData } from './actions/app-data';

var USERNAME = 'kunstkammern';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
    appReducers,
    composeEnhancers(
        applyMiddleware(thunkMiddleware)
    )
);

store.dispatch(fetchData());

const App = () => (
    <div id="wrapper">
        <List />
    </div>
);

document.addEventListener('DOMContentLoaded', () => {
    ReactDom.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('app-content')
    );
});
