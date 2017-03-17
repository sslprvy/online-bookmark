import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import Header from './components/header';
import List from './components/list';
import Login from './components/login';
import { fetchData } from './actions/app-data';
import { store } from './store';

const USERNAME = 'kunstkammern';

store.dispatch(fetchData(USERNAME));

const App = () => (
    <div id="wrapper">
        <Header />
        <List />
        <Login />
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
