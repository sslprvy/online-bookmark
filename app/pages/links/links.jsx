import React from 'react';
import { connect } from 'react-redux';

const mapState = ({ appData }) => {
    return {
        links: appData.links
    };
};

const Links = ({ links }) => {
    return <h1>asdasd</h1>;
};

export default connect(mapState)(Links);
