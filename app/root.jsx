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

import routes from './routes';

function creatRoutingComponents(parent, routes) {
    let routingComponents = Object.keys(routes).map(route => {
        const path = parent + route;
        const props = {
            key: path,
            path,
            component: routes[route].component
        };

        if (routes[route].children) {
            return [<Route {...props} />, creatRoutingComponents(parent + route + '/', routes[route].children)];
        }

        return <Route {...props} />;
    });

    routingComponents = routingComponents.map((routingComponent, index) => {
        if (Array.isArray(routingComponent)) {
            const parent = routingComponent.shift();
            return (
                <div key={index}>
                    {parent}
                    <Switch>
                        {routingComponent}
                    </Switch>
                </div>
            );
        } else {
            return routingComponent;
        }
    });

    return routingComponents;
}

let routingComponents = creatRoutingComponents('/', routes);

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <div>
                {routingComponents}
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
