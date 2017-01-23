const defaultState = {
    isFetching: false,
    userData: {}
};

export default function appData(state = defaultState, action) {
    switch (action.type) {
        case 'FETCHING_DATA':
            return {
                isFetching: true,
                userData: state.userData[0]
            };
        case 'RECEIVED_DATA':
            return {
                isFetching: false,
                userData: action.data[0]
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
