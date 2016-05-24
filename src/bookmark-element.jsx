'use strict';
import React from 'react';

export class BookmarkElement extends React.Component {
    render() {
        var { url, title, tags, comment } = this.props.bookmark;

        return (
            <li className="bookmark-element">
                <div className="bookmark-element-title">{ title }</div>
                <a className="bookmark-element-url" href={ url } target="_blank">{ url }</a>
                <div className="bookmark-element-tags">{ tags.toString() }</div>
                <div className="bookmark-element-comment">{ comment }</div>
            </li>
        );
    }
}