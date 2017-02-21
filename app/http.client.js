'use strict';
import config from '../config';

export function getUserData(username) {
    const request = new Request(`${config.path}/users?name=${username}`, {
        method: 'GET'
    });

    return fetch(request).then(response => response.json());
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
    const highestId = user.data.reduce((accumulator, link) => {
        return link.id > accumulator ? link.id : accumulator;
    }, 0);
    const modifiedLink = Object.assign({}, link, { id: highestId + 1 });
    const modifiedUser = Object.assign({}, user, { data: user.data.concat(modifiedLink) });

    return saveUserData(modifiedUser);
}
