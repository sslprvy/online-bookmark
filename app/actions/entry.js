import { saveUserData, createLink } from '../http.client';

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

export function editEntry(id) {
    return {
        type: 'EDIT_ENTRY',
        id
    };
}

export function saveEntry({ id, user }) {
    return function (dispatch) {
        dispatch(saveEntryAction({ id, user }));

        return saveUserData(user)
            .then(savedUser => dispatch(entrySaved({ user: savedUser })));
    };
}

export function newEntry() {
    return {
        type: 'NEW_ENTRY'
    };
}

export function addEntry(link, user) {
    return function (dispatch) {
        return createLink(link, user)
            .then(savedUser => {
                let savedLink = savedUser.data.slice().reverse()[0];
                dispatch(addEntryAction(savedLink))
            });
    };
}
