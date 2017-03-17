'use strict';
import config from '../config';
import { dispatch, store } from './store';
import { updateToken } from './actions/auth';

export function getUserData(username) {
    const request = new Request(`${config.path}/lists`, {
        method: 'GET',
        headers: {
            Authorization: store.getState().authToken.token
        }
    });

    return fetch(request).then(response => {
        if (response.status === 200) {
            dispatch(updateToken(response.headers.get('authorization')));
            return response.json();
        } else {
            return Promise.reject('no soup for you!');
        }
    });
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
