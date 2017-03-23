'use strict';
import config from '../config';
import { store, dispatch } from './store';
import handleResponse from './helpers/response-handler';
import { loggedIn } from './actions/auth';
import { userCreated } from './actions/user';

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

export function saveList(id, listElement) {
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

export function createLink(link, user) {
    // TODO: This should happen on the backend
    const highestId = user.data.reduce((accumulator, link) => {
        return link.id > accumulator ? link.id : accumulator;
    }, 0);
    const modifiedLink = Object.assign({}, link, { id: highestId + 1 });
    const modifiedUser = Object.assign({}, user, { data: user.data.concat(modifiedLink) });

    return saveList(modifiedUser);
}

export function deleteLink(linkToDelete, user) {
    const modifiedUser = Object.assign({}, user, { data: user.data.filter(link => link !== linkToDelete) });

    return saveList(modifiedUser);
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
    console.log(user);
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
