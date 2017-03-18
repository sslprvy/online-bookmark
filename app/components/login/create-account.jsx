import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validateEmail, validateUsername } from '../../http.client';

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
            isValidEmail: false,
            isPristineUsername: true,
            isPristineEmail: true,
            isDisabled: false
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
        newState[`isPristine${capitalizeFirstLetter(event.target.name)}`] = false;

        this[validationFunctionToCall](newState.createAccountFormState)
            .then(isViolated => {
                newState[subState] = !isViolated;
                newState.isDisabled = false;
                this.setState(newState);
            });
    }

    handleOnChange(event) {
        let newState = Object.assign({}, this.state);
        newState.createAccountFormState[event.target.name] = event.target.value;
        newState.isDisabled = true;

        this.setState(newState);
    }

    validateUsername(user) {
        return validateUsername(user);
    }

    validatePassword(value) {
        return Promise.resolve(false);
    }

    validateEmail(user) {
        // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        var emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const regExpPromise = new Promise((resolve, reject) => {
            emailRegExp.test(user.email) ? resolve(true) : reject(false);
        });

        return Promise.all([
            regExpPromise,
            validateEmail(user)
                .then(isViolated => isViolated ? Promise.reject(true) : false)
        ])
        .then(() => false)
        .catch(() => true);
    }

    render() {
        let attributes = {};
        if (this.state.isDisabled) {
            attributes['disabled'] = 'disabled';
        }

        if (!(this.state.isValidEmail && this.state.isValidPassword && this.state.isValidUsername)) {
            attributes['disabled'] = 'disabled';
        }
        if (this.state.isPristineEmail || this.state.isPristineUsername) {
            attributes['disabled'] = 'disabled';
        }

        let userNameError = this.state.isValidUsername || this.state.isPristineUsername ? null : <p className="error">Username taken</p>;
        let emailError = this.state.isValidEmail || this.state.isPristineEmail ? null : <p className="error">Error in email</p>;

        return (
            <form className="register-form hide-form" onSubmit={this.handleSubmit}>
                {userNameError}
                <input type="text" placeholder="username" name="username"
                       onChange={this.handleOnChange} onBlur={this.handleOnBlur}/>
                <input type="password" placeholder="password" name="password"
                       onChange={this.handleOnChange} onBlur={this.handleOnBlur}/>
                {emailError}
                <input type="text" placeholder="email address" name="email"
                       onChange={this.handleOnChange} onBlur={this.handleOnBlur}/>
                <button {...attributes}>create</button>
                <p className="message">Already registered? <a href="#" onClick={this.props.onLinkClick.bind(null, 'register-form')}>Sign In</a></p>
            </form>
        );
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
