const proxyLoad = (function () {
    let element = {};
    return function (src, type) {
        return new Promise(function (resolve, reject) {
            !src && (reject());
            if (src && type) {
                try {
                    element[type] = element[type] ? element[type] : document.createElement(type);
                    element[type].onload = resolve;
                    element[type].onerror = reject;
                    element[type].src = src;
                } catch (e) {
                    reject(e);
                }
            }
        });
    }
})();

export default {
    proxyLoad
}
