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

const ListElement = ({ listElement, editEntry, ownKey }) => {
    const tagObjects = listElement.tags.map((tag, index) =>
        <div className="display-list-element-tag" key={`${tag}-${index}`}>
            <span>{tag}</span>
        </div>
    );
    return (
        <li className="display-list-element">
            <div>
                <span className="display-list-element-title">{listElement.title}</span><br/>
                <span className="display-list-element-url"><a href={listElement.url} target="_blank">{listElement.url}</a></span><br/>
                <div className="display-list-element-tag-container">{tagObjects}</div>
            </div>
            <span onClick={editEntry.bind(null, ownKey)}>Edit</span>
        </li>
    );
};

ListElement.propTypes = {
    listElement: PropTypes.object.isRequired,
    ownKey: PropTypes.string.isRequired
};

export default connect(null, mapDispatch)(ListElement);
