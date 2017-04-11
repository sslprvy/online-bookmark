'use strict';
import config from '../../config';
import { store } from '../store';
import handleResponse from '../helpers/response-handler';

export function getLists() {
    const headers = new Headers({
        Authorization: store.getState().auth.token
    });
    const request = new Request(`${config.path}/lists`, {
        method: 'GET',
        headers
    });

    return fetch(request).then(handleResponse);
}

export function getList(id) {
    const headers = new Headers({
        Authorization: store.getState().auth.token
    });
    const request = new Request(`${config.path}/lists/${id}`, {
        method: 'GET',
        headers
    });

    return fetch(request).then(handleResponse);
}

export function updateList(id, listElement) {
    const headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: store.getState().auth.token
    });

    const request = new Request(`${config.path}/lists/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(listElement)
    });

    return fetch(request).then(response => response.json());
}

export function saveList(list) {
    const headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: store.getState().auth.token
    });

    const request = new Request(`${config.path}/lists/${list._id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(list)
    });

    return fetch(request).then(response => response.json());
}
