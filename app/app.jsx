import React from 'react';
import ReactDom from 'react-dom';

import { List } from './components/list';

import mockJson from './mock-data';

var USERNAME = 'kunstkammern';

export default class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        return <div><List objects={this.props.userData.data} /></div>;
    }
}

ReactDom.render(<App userData={mockJson[USERNAME]} />, document.getElementById('app-content'));
