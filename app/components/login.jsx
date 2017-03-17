import React from 'react';
import { connect } from 'react-redux';
import { logIn } from '../actions/auth';

const mapState = ({ auth }) => {
    return {
        isLoggedIn: auth.isLoggedIn
    };
};

const mapDispatch = (dispatch) => {
    return {
        login: (user) => {
            logIn(user);
        }
    };
};

const Login = ({ isLoggedIn, login}) => {
    function onChange(loginFormState, event) {
        loginFormState[event.target.name] = event.target.value;
    }

    function handleSubmit(loginFormState, event) {
        event.preventDefault();
        event.stopPropagation();
        login(loginFormState);
    }

    if (!isLoggedIn) {
        let loginFormState = {
            username: '',
            password: ''
        };

        return (
            <div className="login-page">
                <div className="form">
                    <form className="register-form">
                        <input type="text" placeholder="name"/>
                        <input type="password" placeholder="password"/>
                        <input type="text" placeholder="email address"/>
                        <button>create</button>
                        <p className="message">Already registered? <a href="#">Sign In</a></p>
                    </form>
                    <form className="login-form" onSubmit={handleSubmit.bind(null, loginFormState)}>
                        <input type="text" placeholder="username"
                               name="username" onChange={onChange.bind(null, loginFormState)}/>
                        <input type="password" placeholder="password"
                               name="password" onChange={onChange.bind(null, loginFormState)}/>
                        <button>login</button>
                        <p className="message">Not registered? <a href="#">Create an account</a></p>
                    </form>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default connect(mapState, mapDispatch)(Login);
