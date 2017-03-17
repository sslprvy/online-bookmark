import { authenticate } from '../http.client';

export function updateToken(token) {
    return {
        type: 'UPDATE_TOKEN',
        token
    };
}

export function logIn(user) {
    return authenticate(user);
}

export function loggedIn() {
    return {
        type: 'LOGGED_IN'
    };
}
