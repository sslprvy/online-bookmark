const defaultState = {
    editing: false,
    underEdit: ''
};

export default function editEntry(state = defaultState, action) {
    switch (action.type) {
        case 'UPDATE_USER':
        case 'EDIT_ENTRY':
            return {
                editing: true,
                underEdit: action.id
            };
        case 'SAVE_ENTRY':
            return {
                editing: false,
                underEdit: ''
            };
        default:
            return state;
    }
}
