import React from 'react';
import { connect } from 'react-redux';

import ListElement from './list-element';
import EditableListElement from './editable-list-element';

const mapState = ({ appData, editEntry }) => {
    return {
        userData: appData.userData,
        editEntry
    };
};

const List = ({ userData, editEntry }) => {
    if (!userData) {
        return null;
    }

    let userObject = userData.data.map((listElement, index) => {
        if (editEntry.editing && listElement.id === editEntry.underEdit) {
            const key = `${listElement.title}-${index}-edit`;
            return <EditableListElement user={userData} listElement={listElement} key={key} />;
        } else {
            const key = `${listElement.title}-${index}`;
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
