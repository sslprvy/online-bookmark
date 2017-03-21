import React from 'react';
import { connect } from 'react-redux';

import { newEntry } from '../actions/entry';

const mapState = ({ appData, auth }) => {
    return {
        userName: auth.userName,
        isLoggedIn: auth.isLoggedIn
    };
};

const mapDispatch = (dispatch) => {
    return {
        onNewEntryClick: () => {
            dispatch(newEntry());
        }
    };
};

const Header = ({ onNewEntryClick, userName, isLoggedIn }) => {
    const header = (
        <div className="page-header">
            <div className="page-header-username">{userName}</div>
            <div className="add-element" onClick={onNewEntryClick}>
                <i className="fa fa-plus"></i>
            </div>
        </div>
    );

    return isLoggedIn ? header : null;
};

export default connect(mapState, mapDispatch)(Header);
