const defaultState = {
    editing: false,
    newEntry: false,
    underEdit: ''
};

export default function editEntry(state = defaultState, action) {
    switch (action.type) {
        case 'NEW_ENTRY':
            return {
                editing: true,
                newEntry: true
            };
        case 'UPDATE_USER':
        case 'EDIT_ENTRY':
            return {
                editing: true,
                underEdit: action.id
            };
        case 'ADD_ENTRY':
        case 'SAVE_ENTRY':
            return {
                editing: false,
                newEntry: false,
                underEdit: ''
            };
        default:
            return state;
    }
}
