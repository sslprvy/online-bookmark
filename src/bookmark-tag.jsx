'use strict';

import React from 'react';
import _ from 'lodash';

export class BookmarkTag extends React.Component {
    constructor() {
        super();
        this.initMethods();
    }

    initMethods() {
        this.handleClick = (tag) => {
            console.log(tag);
        };
    }

    render() {
        var tagNodes = _.map(this.props.tags, (tag, index) => {
            return (
                <div className="bookmark-element-tag" key={hashCode2(`bookmark-element-tag-${tag}-${index}`)}
                     onClick={this.handleClick.bind(tag)}>
                    { tag }
                </div>
            )
        });


        return (
            <div className="bookmark-element-tag-container">
                { tagNodes }
            </div>
        )
    }
}

// http://mediocredeveloper.com/wp/?p=55
function hashCode2(str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
