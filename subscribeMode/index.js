const subscribe = (function () {
    let message = {};

    let listen = function (key, callback) {
        if (typeof callback === 'function') {
            !message[key] && (message[key] = new Set());
            message[key].add(callback);
            callback();
        }
    };

    let trigger = function () {
        let key = Array.prototype.shift.call(arguments);
        if (key && message[key]) {
            message[key].forEach(cb => {
                cb.apply(this, arguments);
            });
        }

        if (!key) {
            Object.keys(message).forEach(key => {
                message[key].forEach(cb => {
                    cb.apply(this, arguments);
                });
            });
        }
    };

    let remove = function (key, callback) {
        if (!key) {
            message = {};
        }

        if (key) {
            let cbList = message[key];
            if (cbList) {
                !callback && (message[key] = new Set());
                cbList.forEach((cb, i) => {
                    if (cb === callback) {
                        cbList.splice(i, 1);
                    }
                });
            }
        }
    };

    return {
        listen,
        trigger,
        remove
    }

})();

export default {
    subscribe
}
