import React from 'react';
import { connect } from 'react-redux';

import ListElement from './list-element';
import EditableListElement from './editable-list-element';

const mapState = ({ appData, editEntry }) => {
    return {
        userData: appData.users[0],
        editEntry
    };
};

const List = ({ userData, editEntry }) => {
    if (!userData) {
        return null;
    }

    let userObject = userData.data.map((listElement, index) => {
        const key = `${listElement.title}-${index}`;
        if (editEntry.editing && listElement.id === editEntry.underEdit) {
            return <EditableListElement user={user} listElement={listElement} />;
        } else {
            return <ListElement listElement={listElement} key={key} />;
        }
    });

    return (
        <ul className="display-list">
            {userObject}
        </ul>
    );
};

export default connect(mapState)(List);
