const defaultState = {
    isFetching: false,
    lists: []
};

export default function appData(state = defaultState, action) {
    switch (action.type) {
        case 'FETCHING_DATA':
            return {
                isFetching: true,
                lists: state.lists
            };
        case 'RECEIVED_DATA':
            return {
                isFetching: false,
                lists: action.data
            };
        case 'ADD_ENTRY':
            return {
                isFetching: false,
                lists: state.lists.data.concat(action.link)
            };
        case 'DELETE_ENTRY':
            return {
                isFetching: false,
                lists: state.lists.data.filter(link => link !== action.link)
            };
        case 'UPDATE_LIST':
        // TODO: refactor this hack
            return {
                isFetching: false,
                lists: [action.list]
            };
        default:
            return state;
    }
}
