import { FETCHING_DATA, RECEIVED_LISTS, RECEIVED_LINKS, ADD_ENTRY, UPDATE_LIST } from '../helpers/action-types';

const defaultState = {
    isFetching: false,
    lists: [],
    links: []
};

export default function appData(state = defaultState, action) {
    switch (action.type) {
        case FETCHING_DATA:
            return Object.assign({}, state, {
                isFetching: true,
                lists: state.lists
            });
        case RECEIVED_LISTS:
            return Object.assign({}, state, {
                isFetching: false,
                lists: action.data
            });
        case RECEIVED_LINKS:
            return Object.assign({}, state, {
                isFetching: false,
                links: action.data
            });
        case ADD_ENTRY:
            return Object.assign({}, state, {
                isFetching: false,
                lists: state.lists.map(list => {
                    if (list._id === action.listId) {
                        return Object.assign({}, list, { elements: list.elements.concat(action.link) });
                    } else {
                        return list;
                    }
                })
            });
        case UPDATE_LIST:
            return Object.assign({}, state, {
                isFetching: false,
                lists: state.lists.map(list => {
                    return list._id === action.list._id ? action.list : list;
                })
            });
        default:
            return state;
    }
}
