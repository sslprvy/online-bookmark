import { combineReducers } from 'redux';

import appData from './app-data';
import editEntry from './entry';
import authToken from './auth-token';

const appReducers = combineReducers({
    appData,
    editEntry,
    authToken
});

export default appReducers;
