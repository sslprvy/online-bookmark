import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { saveEntry } from '../actions/entry';
import { updateUser } from '../actions/app-data';

const mapDispatch = (dispatch) => {
    return {
        saveEntry: (id, listElement) => {
            dispatch(saveEntry({id, listElement}));
        },
        updateUser: ({ user, id }) => {
            dispatch(updateUser({ user, id }));
        }
    };
};

const EditableListElement = ({ saveEntry, user, updateUser, listElement, listId }) => {
    function updateEntry(event) {
        const property = event.target.name;
        const userData = user.elements.map(element => {
            if (element === listElement) {
                let newProperty = {};
                newProperty[property] = event.target.value;
                return Object.assign({}, element, Object.assign({}, element, newProperty));
            } else {
                return element;
            }
        });

        const newUser = Object.assign({}, user, { data: userData });
        updateUser({ user: newUser, id: listElement.id });
    }

    return (
        <li className="display-list-element">
            <div className="display-list-element-content">
                <input value={listElement.title} onChange={updateEntry} name="title" />
                <input value={listElement.url} onChange={updateEntry} name="url" />
            </div>
            <div className="display-list-element-control">
                <i className="fa fa-floppy-o display-list-element-remove-button"
                    aria-hidden="true"
                    onClick={saveEntry.bind(null, listId, listElement)}></i>
                <i className="fa fa-times display-list-element-cancel-button"
                    aria-hidden="true"></i>
            </div>
        </li>
    );
};

EditableListElement.propTypes = {
    user: PropTypes.object.isRequired,
    listElement: PropTypes.object.isRequired,
    listId: PropTypes.string.isRequired
};

export default connect(null, mapDispatch)(EditableListElement);
