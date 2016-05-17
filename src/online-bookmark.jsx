import React from 'react';
import { render } from 'react-dom';

export class OnlineBookmark extends React.Component {
    render() {
        return (
            <h1>HOWDY</h1>
        );
    }
}

render(
    <OnlineBookmark/>,
    document.getElementById('content')
);