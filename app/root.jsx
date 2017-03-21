import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { store } from './store';

import Login from './pages/login/login';

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <div>
                <Route path="/login" component={Login} />
                <Redirect from="/" to="/login" />
            </div>
        </Router>
    </Provider>
);

document.addEventListener('DOMContentLoaded', () => {
    ReactDom.render(
        <Root store={store} />,
        document.getElementById('app-content')
    );
});
