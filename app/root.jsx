import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import { store } from './store';

import { flatten } from './helpers/util';
import Login from './pages/login/login';
import CreateAccount from './pages/login/create-account';
import App from './pages/app';
import Links from './pages/links/links';
import List from './components/list';

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <div>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={CreateAccount}></Route>
                <Route path="/main" component={App}></Route>
                <Route path="/main/links" component={Links}></Route>
                <Route path="/main/lists" component={List}></Route>
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
