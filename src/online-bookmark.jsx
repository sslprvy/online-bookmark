import React from 'react';
import { render } from 'react-dom';
// FIXME mocked data: remove it when no longer needed
var bookmarks = require('json!./bookmarks.json');

import { BookmarkList } from './bookmark-list.jsx';

export class OnlineBookmark extends React.Component {
    render() {
        return (
            <div>
                <h1>HOWDY</h1>
                <BookmarkList bookmarks={ this.props.data }/>
            </div>
        );
    }
}

render(
    <OnlineBookmark data={ bookmarks } />,
    document.getElementById('content')
);