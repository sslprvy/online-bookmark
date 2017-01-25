import React from 'react';
import { connect } from 'react-redux';

const mapState = ({ appData }) => {
    return {
        userData: appData.userData
    };
};

const Header = ({ userData }) => {
    // NTOE: could be replaced with `_.isEmpty()`
    if (userData.constructor === Object && Object.keys(userData).length === 0) {
        return null;
    }

    let username = userData.name;

    return (
        <div className="page-header">
            <div className="page-header-username">{username}</div>
        </div>
    );
};

export default connect(mapState)(Header);
