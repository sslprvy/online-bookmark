const defaultState = {
    token: ''
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case 'UPDATE_TOKEN':
            return {
                token: action.token
            };

        default:
            return state;
    }
}
