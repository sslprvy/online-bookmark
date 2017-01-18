import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { editEntry } from '../actions/edit-entry';

const mapDispatch = (dispatch) => {
    return {
        editEntry: (id) => {
            dispatch(editEntry(id));
        }
    };
};

const hashId = (title) => {
    return `${title.toLowerCase().replace(/\s/g,'-')}`;
};

const ListElement = ({ listElement, editEntry}) => {
    const tagObjects = listElement.tags.map((tag, index) =>
        <div className="display-list-element-tag" key={`${tag}-${index}`}>
            <span>{tag}</span>
        </div>
    );
    return (
        <li className="display-list-element" id={hashId(listElement.title)}>
            <div>
                <a className="display-list-element-title" href={`#${hashId(listElement.title)}`}>{listElement.title}</a>
                <span className="display-list-element-url"><a href={listElement.url} target="_blank">{listElement.url}</a></span><br/>
                <div className="display-list-element-tag-container">{tagObjects}</div>
            </div>
            <button onClick={editEntry.bind(null, listElement.id)}>Edit</button>
        </li>
    );
};

ListElement.propTypes = {
    listElement: PropTypes.object.isRequired
};

export default connect(null, mapDispatch)(ListElement);
