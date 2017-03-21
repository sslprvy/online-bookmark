import { combineReducers } from 'redux';

import appData from './app-data';
import editEntry from './entry';
import auth from './auth';

const appReducers = combineReducers({
    appData,
    editEntry,
    auth
});

export default appReducers;
