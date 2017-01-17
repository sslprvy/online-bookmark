import React from 'react';
import { connect } from 'react-redux';

import ListElement from './list-element';

const mapState = ({ appData, editEntry }) => {
    return {
        userData: appData.users,
        editEntry
    };
};

const List = ({ userData, editEntry }) => {
    let userObjects = userData.map(user => {
        return user.data.map((listElement, index) => {

            const key = `${listElement.title}-${index}`;
                return <ListElement listElement={listElement} key={key} ownKey={key}/>;
        });
    });

    return (
        <ul>
            {userObjects}
        </ul>
    );
};

export default connect(mapState)(List);
