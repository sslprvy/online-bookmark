import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import List from '../components/list';

const mapState = ({ appData }) => {
    return {
        userData: appData.userData
    };
};

const App = ({ userData }) => {
    return Object.keys(userData).length === 0 ? null : (
        <div id="wrapper">
            <Header />
            <List />
        </div>
    );
};

export default connect(mapState)(App);
