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
