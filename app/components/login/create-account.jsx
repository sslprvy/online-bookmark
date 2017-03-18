import React from 'react';
import { connect } from 'react-redux';

const CreateAccount = ({ onLinkClick }) => {

    return (
        <form className="register-form hide-form">
            <input type="text" placeholder="username"/>
            <input type="password" placeholder="password"/>
            <input type="text" placeholder="email address"/>
            <button>create</button>
            <p className="message">Already registered? <a href="#" onClick={onLinkClick.bind(null, 'register-form')}>Sign In</a></p>
        </form>
    );
};

export default connect()(CreateAccount);
