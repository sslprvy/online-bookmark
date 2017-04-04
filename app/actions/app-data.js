import { getLinks, getLists } from '../ajax/index';
import { FETCHING_DATA, RECEIVED_LISTS, RECEIVED_LINKS, UPDATE_LIST } from '../helpers/action-types';

function fetchingData() {
    return {
        type: FETCHING_DATA
    };
}

function receivedLinks(data) {
    return {
        type: RECEIVED_LINKS,
        data
    };
}

function receivedLists(data) {
    return {
        type: RECEIVED_LISTS,
        data
    };
}

export function updateList({ list, id }) {
    return {
        type: UPDATE_LIST,
        list,
        id
    };
}

export function fetchData() {
    return function (dispatch) {
        dispatch(fetchingData());

        return Promise.all([
            getLinks(),
            getLists()
        ]).then(([links, lists]) => {
            dispatch(receivedLinks(links));
            dispatch(receivedLists(lists));
        });
    };
}
