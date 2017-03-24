import React from 'react';
import { connect } from 'react-redux';
import { logIn } from '../../actions/auth';
import { Link } from 'react-router-dom';

const mapState = ({ auth }) => {
    return {
        isLoggedIn: auth.isLoggedIn
    };
};

const mapDispatch = (dispatch) => {
    return {
        login: (user) => {
            dispatch(logIn(user));
        }
    };
};

const Login = ({ isLoggedIn, login, history }) => {
    function onChange(loginFormState, event) {
        loginFormState[event.target.name] = event.target.value;
    }

    function handleSubmit(loginFormState, event) {
        event.preventDefault();
        event.stopPropagation();
        login(loginFormState);
        history.push('/main');
    }

    if (!isLoggedIn) {
        let loginFormState = {
            username: '',
            password: ''
        };

        return (
            <div className="login-page">
                <div className="form">
                    <form className="login-form" onSubmit={handleSubmit.bind(null, loginFormState)}>
                        <input type="text" placeholder="username"
                               name="username" onChange={onChange.bind(null, loginFormState)}/>
                        <input type="password" placeholder="password"
                               name="password" onChange={onChange.bind(null, loginFormState)}/>
                        <button>login</button>
                        <p className="message">Not registered? <Link to="/register">Create an account</Link></p>
                    </form>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

function addfadeOut(activeFormClass) {
    document.getElementsByClassName(activeFormClass)[0].classList.add('hide-form');
    if (activeFormClass === 'login-form') {
        document.getElementsByClassName('register-form')[0].classList.remove('hide-form');
        document.getElementsByClassName('register-form')[0].classList.add('fadeInUp', 'animated');
    } else {
        document.getElementsByClassName('login-form')[0].classList.remove('hide-form');
        document.getElementsByClassName('login-form')[0].classList.add('fadeInUp', 'animated');
    }

}

export default connect(mapState, mapDispatch)(Login);
