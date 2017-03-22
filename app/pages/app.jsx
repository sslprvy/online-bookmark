import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import List from '../components/list';
import CreateAccount from './login/create-account';

const App = () => {
    return (
        <div id="wrapper">
            <h2>ASDASD</h2>
            <Header />
            <List />
        </div>
    );
};

export default connect()(App);
