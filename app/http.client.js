'use strict';
import config from '../online-bookmark-config/config';
import { store, dispatch } from './store';
import handleResponse from './helpers/response-handler';
import { loggedIn } from './actions/auth';
import { userCreated } from './actions/user';

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

export function createLink({ link, id }) {
    const headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: store.getState().auth.token
    });

    const request = new Request(`${config.path}/lists/${id}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(link)
    });

    return fetch(request).then(response => response.json());
}

export function deleteLink(linkToDelete, list) {
    const modifiedList = Object.assign({}, list, { elements: list.elements.filter(link => link !== linkToDelete) });

    return saveList(modifiedList);
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

            dispatch(loggedIn(user.username));
            return token;
        });
}

export function validateUsername(user) {
    return validateUserCredentials(user)
        .then(() => false)
        .catch(response => response.username);
}

export function validateEmail(user) {
    return validateUserCredentials(user)
        .then(() => false)
        .catch(response => response.email);
}

function validateUserCredentials(user) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    const request = new Request(`${config.path}/user/validate`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers
    });

    return fetch(request)
        .then(response => Promise.all([response.ok, response.json()]))
        .then(([isOk, response]) => {
            if (!isOk) {
                throw response;
            }

            return response;
        });
}

export function createUser(user) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    const request = new Request(`${config.path}/user`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers
    });

    return fetch(request)
        .then(response => response.json())
        .then((response) => {
            dispatch(userCreated());
            return response;
        });
}
