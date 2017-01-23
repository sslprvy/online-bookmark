'use strict';
import config from '../config';

export function getUserData(username) {
    const request = new Request(`${config.path}/users?name=${username}`, {
        method: 'GET'
    });
    return fetch(request).then(response => response.json());
}
