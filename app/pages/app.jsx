import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import List from '../components/list';

const mapState = ({ appData }) => {
    return {
        lists: appData.lists
    };
};

const App = ({ lists }) => {
    return Object.keys(lists).length === 0 ? null : (
        <div id="wrapper">
            <Header />
            <List />
        </div>
    );
};

export default connect(mapState)(App);
