import { combineReducers } from 'redux';

import appData from './app-data';
import editEntry from './entry';
import auth from './auth';
import userAccount from './user';

const appReducers = combineReducers({
    appData,
    editEntry,
    auth,
    userAccount
});

export default appReducers;
