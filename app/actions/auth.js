import { authenticate } from '../http.client';
import { fetchData } from './app-data';

export function updateToken(token) {
    return {
        type: 'UPDATE_TOKEN',
        token
    };
}

export function loggedIn() {
    return {
        type: 'LOGGED_IN'
    };
}

export function logIn(user) {
    return function (dispatch) {
        authenticate(user)
            .then(({access_token: token}) => {
                dispatch(updateToken(token));
                dispatch(fetchData());
            });
    };
}