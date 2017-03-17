import React from 'react';
import { connect } from 'react-redux';

import { newEntry } from '../actions/entry';

const mapState = ({ appData, authToken }) => {
    console.log(authToken);
    return {
        userData: appData.userData
    };
};

const mapDispatch = (dispatch) => {
    return {
        onNewEntryClick: () => {
            dispatch(newEntry());
        }
    };
};

const Header = ({ userData, onNewEntryClick }) => {
    // NOTE: could be replaced with `_.isEmpty()`
    if (userData.constructor === Object && Object.keys(userData).length === 0) {
        return null;
    }

    let username = userData.name;

    return (
        <div className="page-header">
            <div className="page-header-username">{username}</div>
            <div className="add-element" onClick={onNewEntryClick}>
                <i className="fa fa-plus"></i>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch)(Header);
