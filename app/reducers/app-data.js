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
    case 'UPDATE_USER':
        return {
            isFetching: false,
            users: state.users.map(user => {
                if (user.id === action.user.id) {
                    return action.user;
                } else {
                    return user;
                }
            })
        };
    default:
        return state;
    }
}
