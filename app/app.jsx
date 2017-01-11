import React from 'react';
import ReactDom from 'react-dom';

import { List } from './components/list';

import config from '../config';

var USERNAME = 'kunstkammern';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            userData: {
                data: []
            }
        }
    }

    componentDidMount() {
        const request = new Request(`${config.path}/users`, {
            method: 'GET'
        });
        fetch(request)
            .then(response => response.json())
            .then(users => {
                this.setState({
                    userData: users[USERNAME]
                });
            });
    }

    render() {
        return <div><List objects={this.state.userData.data} /></div>;
    }
}

ReactDom.render(<App />, document.getElementById('app-content'));
