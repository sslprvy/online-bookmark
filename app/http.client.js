'use strict';
import config from '../config';

export function getUsers() {
    const request = new Request(`${config.path}/users`, {
        method: 'GET'
    });
    return fetch(request)
        .then(response => response.json());
}
