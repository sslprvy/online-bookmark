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

function addEntryAction(link, listId) {
    return {
        type: 'ADD_ENTRY',
        link,
        listId
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

export function addEntry(link, list) {
    return function (dispatch) {
        return createLink({ link, id: list._id })
            .then(savedList => {
                const savedLink = savedList.elements.slice().reverse()[0];
                const listId = list._id;
                dispatch(addEntryAction(savedLink, listId));
            });
    };
}

export function deleteEntry(link, list) {
    return function (dispatch) {
        return deleteLink(link, list)
            .then(savedUser => dispatch(deleteEntryAction(link)));
    };
}
