const defaultState = {
    token: '',
    isLoggedIn: false,
    userName: ''
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case 'UPDATE_TOKEN':
            return {
                token: action.token,
                isLoggedIn: state.isLoggedIn,
                userName: state.userName
            };
        case 'LOGGED_IN':
            return {
                isLoggedIn: true,
                token: state.token,
                userName: action.userName
            };
        default:
            return state;
    }
}
