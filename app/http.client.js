'use strict';
import config from '../config';
import { store, dispatch } from './store';
import handleResponse from './helpers/response-handler';
import { loggedIn } from './actions/auth';

export function getUserData() {
    const headers = new Headers({
        Authorization: store.getState().auth.token
    });
    const request = new Request(`${config.path}/lists`, {
        method: 'GET',
        headers
    });

    return fetch(request).then(handleResponse);
}

export function saveUserData(user) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    const request = new Request(`${config.path}/users/${user.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(user)
    });

    return fetch(request).then(response => response.json());
}

export function createLink(link, user) {
    // TODO: This should happen on the backend
    const highestId = user.data.reduce((accumulator, link) => {
        return link.id > accumulator ? link.id : accumulator;
    }, 0);
    const modifiedLink = Object.assign({}, link, { id: highestId + 1 });
    const modifiedUser = Object.assign({}, user, { data: user.data.concat(modifiedLink) });

    return saveUserData(modifiedUser);
}

export function deleteLink(linkToDelete, user) {
    const modifiedUser = Object.assign({}, user, { data: user.data.filter(link => link !== linkToDelete) });

    return saveUserData(modifiedUser);
}

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

            dispatch(loggedIn());
            return token;
        });
}
