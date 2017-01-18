import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { saveEntry } from '../actions/edit-entry';
import { updateUser } from '../actions/app-data';

const mapDispatch = (dispatch) => {
    return {
        saveEntry: (id) => {
            dispatch(saveEntry(id));
        },
        updateUser: (user) => {
            dispatch(updateUser(user));
        }
    };
};


const EditableListElement = ({ saveEntry, user, updateUser, listElement }) => {
    function updateEntry(event) {
        const property = event.target.name;
        const userData = user.data.map(element => {
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
        <li>
            <label>
                Title:
                <input value={listElement.title} onChange={updateEntry} name="title" />
            </label>
            <label>
                Url:
                <input value={listElement.url} onChange={updateEntry} name="url" />
            </label>
            <button onClick={saveEntry.bind(null, listElement.id)}>Done</button>
        </li>
    );
};

EditableListElement.propTypes = {
    user: PropTypes.object.isRequired,
    listElement: PropTypes.object.isRequired
};

export default connect(null, mapDispatch)(EditableListElement);
