'use strict';
import React from 'react';
import _ from 'lodash';
import { BookmarkElement } from './bookmark-element.jsx';


export class BookmarkList extends React.Component {
    render() {
        var bookmarkElementNodes = _.map(this.props.bookmarks.links, (bookmark) => {
            return (
                <BookmarkElement bookmark={ bookmark } key={ bookmark.id }/>
            );
        });

        return (
            <ul className="bookmark-list">
                { bookmarkElementNodes }
            </ul>
        );
    }
}