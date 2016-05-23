'use strict';
import React from 'react';

export class BookmarkElement extends React.Component {
    render() {
        var { url, title, tags, comment } = this.props.bookmark;

        return (
            <li class="bookmark-element">
                <div class="bookmark-element-title">{ title }</div>
                <a class="bookmark-element-url" href={ url }>{ url }</a>
                <div class="bookmark-element-tags">{ tags.toString() }</div>
                <div class="bookmark-element-comment">{ comment }</div>
            </li>
        );
    }
}