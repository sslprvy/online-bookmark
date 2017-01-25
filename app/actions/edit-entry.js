import { saveUserData } from '../http.client';

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
