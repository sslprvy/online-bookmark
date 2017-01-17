import React from 'react';
import { connect } from 'react-redux';

import { saveEntry } from '../actions/edit-entry';

const mapDispatch = (dispatch) => {
    return {
        saveEntry: (id) => {
            dispatch(saveEntry(id));
        }
    }
}

const EditableListElement = ({ saveEntry }) => {
    return (
        <li>
            <span onClick={saveEntry.bind(null, 'asd')}>ASD</span>
        </li>
    );
};

export default connect(null, mapDispatch)(EditableListElement);
