import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class CreateAccount extends Component {
    constructor() {
        super();

        this.state = {
            createAccountFormState: {
                username: '',
                password: '',
                email: ''
            },
            isValidPassword: false,
            isValidUsername: false,
            isValidEmail: false
        };

        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    handleOnBlur(event) {
        const validationFunctionToCall = `validate${capitalizeFirstLetter(event.target.name)}`;
        let newState = Object.assign({}, this.state);
        let subState = `isValid${capitalizeFirstLetter(event.target.name)}`;

        if (this[validationFunctionToCall](event.target.value)) {
            newState[subState] = true;
        } else {
            newState[subState] = false;
        }

        this.setState(newState);
    }

    handleOnChange(event) {
        let newState = Object.assign({}, this.state);
        newState.createAccountFormState[event.target.name] = event.target.value;

        this.setState(newState);
    }

    validateUsername(value) {
        return true;
    }

    validatePassword(value) {
        return true;
    }

    validateEmail(value) {
        // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        var emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegExp.test(value);
    }

    render() {
        let opts = {};
        if (!(this.state.isValidEmail || this.isValidPassword || this.isValidUsername)) {
            opts['disabled'] = 'disabled';
        }

        return (
            <form className="register-form hide-form" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="username" name="username"
                       onChange={this.handleOnChange} onBlur={this.handleOnBlur}/>
                <input type="password" placeholder="password" name="password"
                       onChange={this.handleOnChange} onBlur={this.handleOnBlur}/>
                <input type="text" placeholder="email address" name="email" onBlur={this.handleOnBlur}/>
                <button {...opts}>create</button>
                <p className="message">Already registered? <a href="#" onClick={this.props.onLinkClick.bind(null, 'register-form')}>Sign In</a></p>
            </form>
        );
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
