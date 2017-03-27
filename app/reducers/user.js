import { USER_CREATED } from '../helpers/action-types';

const defaultState = {
    userCreated: false
};

export default function userAccount(state = defaultState, action) {
    switch(action.type) {
        case USER_CREATED:
            return {
                userCreated: true
            };
        default:
            return state;
    }
}
