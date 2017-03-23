import { saveList, createLink, deleteLink } from '../http.client';

function saveEntryAction({ id, listElement }) {
    return {
        type: 'SAVE_ENTRY',
        listElement,
        id
    };
}

function entrySaved({ user }) {
    return {
        type: 'ENTRY_SAVED',
        user
    };
}

function addEntryAction(link) {
    return {
        type: 'ADD_ENTRY',
        link
    };
}

function deleteEntryAction(link) {
    return {
        type: 'DELETE_ENTRY',
        link
    };
}

export function editEntry(id) {
    return {
        type: 'EDIT_ENTRY',
        id
    };
}

export function newEntry() {
    return {
        type: 'NEW_ENTRY'
    };
}

export function saveEntry({ id, listElement }) {
    return function (dispatch) {
        dispatch(saveEntryAction({ id, listElement }));

        return saveList(id, listElement)
            .then(savedUser => dispatch(entrySaved({ user: savedUser })));
    };
}

export function addEntry(link, user) {
    return function (dispatch) {
        return createLink(link, user)
            .then(savedUser => {
                let savedLink = savedUser.data.slice().reverse()[0];
                dispatch(addEntryAction(savedLink));
            });
    };
}

export function deleteEntry(link, user) {
    return function (dispatch) {
        return deleteLink(link, user)
            .then(savedUser => dispatch(deleteEntryAction(link)));
    };
}
