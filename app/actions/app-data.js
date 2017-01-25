import { getUserData } from '../http.client';

function fetchingData() {
    return {
        type: 'FETCHING_DATA'
    };
}

function receivedData(data) {
    return {
        type: 'RECEIVED_DATA',
        data: data
    };
}

export function updateUser({ user, id }) {
    return {
        type: 'UPDATE_USER',
        user,
        id
    };
}

export function fetchData(username) {
    if (username === undefined) {
        // TODO: implement error handling
    }
    return function (dispatch) {
        dispatch(fetchingData());

        return getUserData(username)
            .then(users => dispatch(receivedData(users)));
    };
}
