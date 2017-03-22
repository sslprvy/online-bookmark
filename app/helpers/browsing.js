import { createBrowserHistory } from 'history';


export default class Browsing {
    constructor() {
        this._history = createBrowserHistory();
        this._location = this._history.location;
    }

    get location() {
        return this._location;
    }

    /**
     * @param {Object} obj - location object
     * @param {string} obj.path - the url e.g.: /some-path
     * @param {Object} obj.state - state object
     */
    set location({path, state}) {
        this._history.push(path, state);
    }

    subscribe(listener) {
        return this._history.listen(listener);
    }
}
