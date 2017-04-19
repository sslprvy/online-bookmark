import config from '../../config';
import { store, dispatch } from '../store';
import { loggedIn } from '../actions/auth';
import { userCreated } from '../actions/user';

export function authenticate(user) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    const request = new Request(`${config.path}/user/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers
    });

    return fetch(request)
        .then(response => response.json())
        .then((token) => {

            dispatch(loggedIn(user.username));
            return token;
        });
}

export function validateUsername(user) {
    return validateUserCredentials(user)
        .then(() => false)
        .catch(response => response.username);
}

export function validateEmail(user) {
    return validateUserCredentials(user)
        .then(() => false)
        .catch(response => response.email);
}

function validateUserCredentials(user) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    const request = new Request(`${config.path}/user/validate`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers
    });

    return fetch(request)
        .then(response => Promise.all([response.ok, response.json()]))
        .then(([isOk, response]) => {
            if (!isOk) {
                throw response;
            }

            return response;
        });
}

export function createUser(user) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    const request = new Request(`${config.path}/user`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers
    });

    return fetch(request)
        .then(response => response.json())
        .then((response) => {
            dispatch(userCreated());
            return response;
        });
}
