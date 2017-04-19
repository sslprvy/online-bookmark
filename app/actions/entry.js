import { updateList as saveList, createLink, deleteLink } from '../ajax/index';
import { updateList } from './app-data';
import { SAVE_ENTRY, ENTRY_SAVED, ADD_ENTRY, EDIT_ENTRY, NEW_ENTRY, CANCEL_EDIT } from '../helpers/action-types';

function saveEntryAction({ id, listElement }) {
    return {
        type: SAVE_ENTRY,
        listElement,
        id
    };
}

function entrySaved({ user }) {
    return {
        type: ENTRY_SAVED,
        user
    };
}

function addEntryAction(link, listId) {
    return {
        type: ADD_ENTRY,
        link,
        listId
    };
}

export function editEntry(id) {
    return {
        type: EDIT_ENTRY,
        id
    };
}

export function cancelEdit() {
    return {
        type: CANCEL_EDIT
    };
}

export function newEntry() {
    return {
        type: NEW_ENTRY
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

export function deleteEntry(linkToDelete, list) {
    return function (dispatch) {
        // we want to instantly change the UI
        const modifiedList = Object.assign({}, list, { elements: list.elements.filter(link => link !== linkToDelete) });
        dispatch(updateList({ list: modifiedList, id: list._id }));

        return deleteLink(linkToDelete, list)
            .then(savedList => dispatch(updateList({ list: savedList, id: savedList._id })));
    };
}
