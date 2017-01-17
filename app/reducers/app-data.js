const defaultState = {
    isFetching: false,
    users: []
};

export default function appData(state = defaultState, action) {
    switch (action.type) {
        case 'FETCHING_DATA':
            return {
                isFetching: true,
                users: state.users
            };
        case 'RECEIVED_DATA':
            return {
                isFetching: false,
                users: action.data
            };
        default:
            return state;
    }
}
