import { getLinks, getLists, getList } from '../ajax/index';
import { FETCHING_DATA, RECEIVED_LISTS, RECEIVED_LINKS, UPDATE_LIST, RECEIVED_LIST } from '../helpers/action-types';

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

function receivedList(data) {
    return {
        type: RECEIVED_LIST,
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

export function fetchList({ id }) {
    return function (dispatch) {
        dispatch(fetchingData());

        return getList().then(list => {
            dispatch(receivedList(list));
        });
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
