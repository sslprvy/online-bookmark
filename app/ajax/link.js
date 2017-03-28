'use strict';
import config from '../../config';
import { store } from '../store';
import { saveList } from './index';

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
