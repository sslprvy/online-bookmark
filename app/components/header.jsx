import React from 'react';
import { connect } from 'react-redux';

const mapState = ({ appData }) => {
    return {
        userData: appData.userData
    };
};

const Header = ({ userData }) => {
    if (!userData) {
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
