'use strict';

import _ from 'lodash';

export var EventHub = (function() {
    var instance,
        events = [];

    function subscribe(eventName, callback) {
        if (!_.isArray(events[eventName])) {
            events[eventName] = [];
        }

        events[eventName].push(callback);
    }

    function unSubscribe(eventName, callback) {
        events[eventName] = _.difference(events[eventName], [callback]);
    }

    function notify(eventName, ...parameters) {
        if (events[eventName]) {
            events[eventName].forEach(callback => {
                callback.apply(null, parameters);
            });
        }
    }

    function createInstance() {
        return new Object({
            subscribe: subscribe,
            unSubscribe: unSubscribe,
            notify: notify
        });
    }

    return {
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
