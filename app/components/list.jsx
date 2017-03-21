import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListElement from './list-element';
import EditableListElement from './editable-list-element';
import NewElement from './new-element';

const mapState = ({ appData, editEntry }) => {
    return {
        userData: appData.userData,
        editEntry
    };
};

const List = ({ userData, editEntry }) => {
    // NOTE: could be replaced with `_.isEmpty()`
    if (userData.constructor === Object && Object.keys(userData).length === 0) {
        return null;
    }

    let userObject = userData.elements.map((listElement, index) => {
        if (editEntry.editing && listElement.id === editEntry.underEdit) {
            const key = `${listElement.id}-${index}-edit`;
            return <EditableListElement user={userData} listElement={listElement} key={key} />;
        } else {
            const key = `${listElement.id}-${index}`;
            return <ListElement listElement={listElement} key={key} user={userData} />;
        }
    });

    if (editEntry.editing && editEntry.newEntry) {
        userObject.unshift(<NewElement key="new-element" user={userData} />);
    }

    return (
        <ul className="display-list">
            {userObject}
        </ul>
    );
};

export default connect(mapState)(List);
