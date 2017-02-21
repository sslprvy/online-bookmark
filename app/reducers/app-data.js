const defaultState = {
    isFetching: false,
    userData: {}
};

export default function appData(state = defaultState, action) {
    switch (action.type) {
        case 'FETCHING_DATA':
            return {
                isFetching: true,
                userData: state.userData
            };
        case 'RECEIVED_DATA':
            return {
                isFetching: false,
                userData: action.data
            };
        case 'ADD_ENTRY':
            let userData = Object.assign({}, state.userData, { data: state.userData.data.concat(action.link) });
            return {
                isFetching: false,
                userData
            };
        case 'UPDATE_USER':
            return {
                isFetching: false,
                userData: action.user
            };
        default:
            return state;
    }
}
