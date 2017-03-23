import { saveList, createLink, deleteLink } from '../http.client';

function saveEntryAction({ id, user }) {
    return {
        type: 'SAVE_ENTRY',
        user,
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

export function saveEntry({ id, list }) {
    return function (dispatch) {
        dispatch(saveEntryAction({ id, list }));

        return saveList(id, list)
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
