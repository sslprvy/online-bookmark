import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import List from '../components/list';
import Links from './links/links';

const mapState = ({ appData }) => {
    return {
        lists: appData.lists,
        links: appData.links
    };
};

const App = ({ lists, links }) => {
    return (
        <div id="wrapper">
            <Header />
        </div>
    );
};

export default connect(mapState)(App);
