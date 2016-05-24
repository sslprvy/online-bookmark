'use strict';
import React from 'react';
import { BookmarkTag } from './bookmark-tag.jsx'

export class BookmarkElement extends React.Component {
    render() {
        var { url, title, tags, comment } = this.props.bookmark;

        return (
            <li className="bookmark-element">
                <div className="bookmark-element-title">{ title }</div>
                <div className="bookmark-element-url-wrapper">
                    <a className="bookmark-element-url" href={ url } target="_blank">{ url }</a>
                </div>
                <BookmarkTag tags={tags}/>
                <div className="bookmark-element-comment">{ comment }</div>
            </li>
        );
    }
}