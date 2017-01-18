export function editEntry(id) {
    return {
        type: 'EDIT_ENTRY',
        id
    };
}

export function saveEntry(id) {
    return {
        type: 'SAVE_ENTRY',
        id
    };
}
