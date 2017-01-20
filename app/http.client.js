'use strict';
import config from '../config';

export function getUsers(username) {
    const request = new Request(`${config.path}/users?name=${username}`, {
        method: 'GET'
    });
    return fetch(request).then(response => response.json());
}
