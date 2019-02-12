/**
 * 解析一个url，依赖ElementObject
 * 如果相对路径，默认当前域名
 * @method parseUrl
 * @param {string} url
 * @return {object} urlObject
 * */
export const parseUrl = function (url) {
    let a = document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function () {
            let ret = {},
                seg = a.search.replace(/^\?/, '').split('&'),
                len = seg.length,
                i = 0,
                s;
            for (; i < len; i++) {
                if (!seg[i]) {
                    continue;
                }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
    };
};


/**
 * 获取url的参数
 * @method getParams
 * @param {string} url
 * @return {object} params
 * */
export const getParams = function (url) {
    let params = {};
    if (url.includes('?')) {
        let list = url.split('?')[1].split('&');
        list.forEach(item => {
            params[item.split('=')[0]] = decodeURIComponent(item.split('=')[1]);
        });
    }
    return params;
};

export default {
    parseUrl,
    getParams,
}

