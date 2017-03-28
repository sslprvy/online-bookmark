import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { store } from './store';

import Login from './pages/login/login';
import CreateAccount from './pages/login/create-account';
import App from './pages/app';

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <div>
                <Route path="/login" component={Login} />
                <Route path="/register" component={CreateAccount} />
                <Route path="/main" component={App}>
                </Route>
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
