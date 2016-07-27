import React from 'react';
import ReactDom from 'react-dom';

export default class Hello extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div>Hello World</div>
        )
    }
}

ReactDom.render(<Hello />, document.getElementById('app-content'));
