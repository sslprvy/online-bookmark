import React from 'react';
import { connect } from 'react-redux';

const mapState = ({ appData }) => {
    return {
        lists: appData.lists
    }
};

const Lists = ({ lists }) => {
    console.log(lists);
    return <h1>Lists</h1>;
};

export default connect(mapState)(Lists);
