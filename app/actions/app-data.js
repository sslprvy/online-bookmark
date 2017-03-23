import { getLists } from '../http.client';

function fetchingData() {
    return {
        type: 'FETCHING_DATA'
    };
}

function receivedData(data) {
    return {
        type: 'RECEIVED_DATA',
        data
    };
}

export function updateList({ list, id }) {
    return {
        type: 'UPDATE_LIST',
        list,
        id
    };
}

export function fetchData() {
    return function (dispatch) {
        dispatch(fetchingData());

        return getLists()
            .then(lists => {
                dispatch(receivedData(lists));
            });
    };
}
