import React from 'react';
import { connect } from 'react-redux';

import ListElement from './list-element';
import EditableListElement from './editable-list-element';
import NewElement from './new-element';

const mapState = ({ appData, editEntry }) => {
    // TODO: Should be selectable which list to show
    return {
        list: appData.lists[0],
        listId: appData.lists[0]._id,
        editEntry
    };
};

const List = ({ list, editEntry, listId }) => {
    let userObject = list.elements.map((listElement, index) => {
        if (editEntry.editing && listElement._id === editEntry.underEdit) {
            const key = `${listElement._id}-${index}-edit`;
            let props = {
                list,
                listElement,
                key
            };
            return <EditableListElement {...props}/>;
        } else {
            const key = `${listElement._id}-${index}`;
            let props = {
                listElement,
                list,
                key
            };
            return <ListElement {...props} />;
        }
    });

    if (editEntry.editing && editEntry.newEntry) {
        userObject.unshift(<NewElement key="new-element" list={list} />);
    }

    return (
        <ul className="display-list">
            {userObject}
        </ul>
    );
};

export default connect(mapState)(List);
