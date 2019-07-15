import Qs from 'qs';
import axios from 'axios'; // ^0.18.0 版本
import {Message, Loading} from 'element-ui';

const CancelToken = axios.CancelToken;
const ajaxMap = new Map();
const cancelMap = new Map(); // 存着所有cancal对象的函数
const prefixUrl = '/api/provider';
let loadingProxy = null;

// 基础配置
const Axios = axios.create({
    baseURL: '/',
    timeout: 5 * 60 * 1000,
    responseType: 'json',
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
});

const install = function (Vue) {
    //请求拦截器
    Axios.interceptors.request.use(
        config => {
            if (!config.ajaxOpt.noAbort) {
                // 防重复提交
                if (ajaxMap.has(config.uniqueKeyString)) {
                    // 取消当前请求
                    config.cancelToken = new CancelToken(cancel => {
                        cancel('重复发请求，操作取消');
                    });
                }
                ajaxMap.set(
                    config.uniqueKeyString,
                    cancelMap.get(config.uniqueKeyString)
                );
            }

            // 数据格式转换
            let methodList = ['post', 'put', 'delete'];
            if (methodList.includes(config.method.toLowerCase())) {
                config.transformRequest = [(data) => Qs.stringify(data, {arrayFormat: 'brackets'})];
            }

            // 添加加载效果
            addLoading();

            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    // 响应拦截器
    Axios.interceptors.response.use(
        res => {
            //响应回来后，删掉ajaxMap里面的
            ajaxMap.delete(res.config.uniqueKeyString);

            // 关闭加载效果
            closeLoading();

            // 请求失败
            if (res.data.code !== 200) {
                Message({message: res.data.msg || '请求失败', type: 'error'});
                return Promise.reject(res.data);
            }

            return res;
        },
        err => {
            //
            ajaxMap.clear();

            // 关闭加载效果
            closeLoading();

            return Promise.reject(err);
        }
    );

    // 挂在全局变量下
    Vue.prototype.$proxy = (ajaxParams = {}, ajaxOpt) => {
        ajaxOpt = Object.assign(
            {
                noAbort: false // 默认能被abort
            },
            ajaxOpt
        );

        // 添加请求前缀
        if (!ajaxParams.url.startsWith(prefixUrl)) {
            ajaxParams.url = prefixUrl + ajaxParams.url;
        }

        // 默认使用POST方法
        ajaxParams.method = ajaxParams.method || 'POST';

        // 兼容一下get请求，axios里面它发的是params
        if (ajaxParams.method.toUpperCase() === 'GET' && ajaxParams.data) {
            ajaxParams.params = ajaxParams.data;
            delete ajaxParams.data;
        }

        //  每个url独一无二的id
        const uniqueKeyString = Qs.stringify(
            Object.assign(
                {},
                {url: ajaxParams.url, method: ajaxParams.method},
                ajaxParams.data
            )
        );

        //返回请求
        return Axios({
            ...ajaxParams,
            ajaxOpt,
            uniqueKeyString,
            cancelToken: new CancelToken(c => {
                cancelMap.set(uniqueKeyString, c);
            })
        });
    };

    // 切换路由
    Vue.prototype.$abort = () => {
        for (let params of ajaxMap.entries()) {
            let key = params[0];
            let cancel = params[1];
            cancel('切换路由，操作取消');
            ajaxMap.delete(key);
        }
    };

    // 匹配某个url单独的abort方法
    Vue.prototype.urlAbort = url => {
        for (let params of ajaxMap.entries()) {
            let key = params[0];
            let cancel = params[1];
            if (url === Qs.parse(key)['url']) {
                cancel('url一致，操作取消');
                ajaxMap.delete(key);
            }
        }
    };
};

// 添加加载效果
function addLoading() {
    if (!loadingProxy) {
        loadingProxy = Loading.service({
            lock: true,
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.6)'
        });
    }
}

// 关闭加载效果
function closeLoading() {
    if (!Object.keys(ajaxMap).length && loadingProxy) {
        loadingProxy.close();
        loadingProxy = null;
    }
}

export default install;
