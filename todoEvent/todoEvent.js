const todoEvent = (function () {
    let todo = {};

    let listen = function (key, callback) {
        if (typeof callback === 'function') {
            !todo[key] && (todo[key] = new Set());
            todo[key].add(callback);
            callback();
        }
    };

    let trigger = function () {
        let key = Array.prototype.shift.call(arguments);
        if (key && todo[key]) {
            todo[key].forEach(cb => {
                cb.apply(this, arguments);
            });
        }

        if (!key) {
            Object.keys(todo).forEach(key => {
                todo[key].forEach(cb => {
                    cb.apply(this, arguments);
                });
            });
        }
    };

    let remove = function (key, callback) {
        if (!key) {
            todo = {};
        }

        if (key) {
            let cbList = todo[key];
            if (cbList) {
                !callback && (todo[key] = new Set());
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
    todoEvent
}
