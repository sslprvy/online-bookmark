export function updateToken(token) {
    return {
        type: 'UPDATE_TOKEN',
        token
    };
}

export function logIn() {
    return {
        type: 'LOGIN'
    };
}
