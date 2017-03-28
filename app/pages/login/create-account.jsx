import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validateEmail, validateUsername, createUser } from '../../ajax/index';
import { store } from '../../store';
import { Link } from 'react-router-dom';

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
            isDisabled: false,
            isCreated: false
        };

        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.updateState = this.updateState.bind(this);
        this.unsub = store.subscribe(() => {
            const { userAccount } = store.getState();
            if (userAccount.userCreated) {
                this.updateState({ isCreated: true });
            }
        });
    }

    updateState(newState) {
        this.setState(newState);
    }

    componentWillUnmount() {
        this.unsub();
    }

    handleSubmit(user, event) {
        event.preventDefault();
        event.stopPropagation();
        createUser(user);
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
        let registerForm = (
            <div className="login-page">
                <div className="form">
                    <form className="register-form" onSubmit={this.handleSubmit.bind(null, this.state.createAccountFormState)}>
                        {userNameError}
                        <input type="text" placeholder="username" name="username"
                            onChange={this.handleOnChange} onBlur={this.handleOnBlur}/>
                        <input type="password" placeholder="password" name="password"
                            onChange={this.handleOnChange} onBlur={this.handleOnBlur}/>
                        {emailError}
                        <input type="text" placeholder="email address" name="email"
                            onChange={this.handleOnChange} onBlur={this.handleOnBlur}/>
                        <button {...attributes}>create</button>
                        <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
                    </form>
                </div>
            </div>
        );

        // TODO: resend verification email when email address is wrong
        let userCreated = (
            <div>
                <h3>User successfully created</h3>
                <p className="text">Please check your email and verify it by clicking on the sent link</p>
            </div>
        );

        return this.state.isCreated ? userCreated : registerForm;
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
