const defaultState = {
    token: '',
    isLoggedIn: false
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case 'UPDATE_TOKEN':
            return {
                token: action.token,
                isLoggedIn: state.isLoggedIn
            };
        case 'LOGGED_IN':
            return {
                isLoggedIn: true,
                token: state.token
            };
        default:
            return state;
    }
}
