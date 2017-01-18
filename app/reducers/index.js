import { combineReducers } from 'redux';

import appData from './app-data';
import editEntry from './edit-entry';

const appReducers = combineReducers({
    appData,
    editEntry
});

export default appReducers;
