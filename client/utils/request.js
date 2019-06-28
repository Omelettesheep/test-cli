/* eslint-disable */
import axios from 'axios';
import qs from 'qs';
import history from '@utils/history';

let stopRepeatRequest = false;

function checkStatus(response) {
    stopRepeatRequest = false;
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

function parseJSON(response) {
    return response.data;
}

function checkFlag(reqUrl, data) {
    let errno = +data.errno || +data.error_code;
    let errmsg = data.errmsg;
    // 前端根据errno进行路由处理
    if (errno) {
        // const error = new Error(data.errmsg);
        // error.response = data;
        // error.errmsg = data.errmsg;
        // throw error;
        let domain = window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '');
        let url;
        switch (errno) {
            // 已经注册pass，没注册百家号->跳百家号注册第一步
            case 20040201:
            case 20040000:
                url = `${domain}/builder/app/choosetype`;
                break;
            // 没有绑定手机号
            case 20040222:
                url = `${domain}/builder/app/currentuser`;
                break;
            // 没有权限
            case 10001401: // 账号已退出，请重新登录
            case 20040001: // ERR_BJHAUTHOR_USER_NOT_LOGIN
            case 20040111: // ERR_PASS_NOT_LOGIN
            case 27026: // session 失效
                url = `${domain}/builder/author/register/index`;
                break;
            case 20040226: // 没有授权百家号
                if (reqUrl.indexOf('/builder/app/appinfo') > -1) {
                    url = `${domain}/builder/author/userinfo/auth`;
                }
                break;
            case 20011028: // 暂不支持医疗、法律领域
                if (reqUrl.indexOf('/builder/app/appinfo') > -1) {
                    url = `/builder/rc/forbidden?aside=0&domain=${errmsg}`;
                }
                break;
            // case 20011128: // 暂不支持法律领域
            //     if (reqUrl.indexOf('/builder/app/appinfo') > -1) {
            //         url = `/builder/rc/forbidden?aside=0&domain=law`;
            //     }
            //     break;
            default:
                break;
        }
        if (url && url !== window.location.href) {
            if (url.indexOf('/rc/') > -1) {
                history.push(url);
            } else {
                window.location.replace(url);
            }
        }
    }
    return data;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           An object containing either "data" or "err"
 */
function request(type) {
    return (url, payload = {}, config = {}, needStopRepeat = false) => {
        if (typeof config === 'boolean') {
            needStopRepeat = config;
        }
        let params = {};
        if ('get' === type) {
            let getParams = qs.stringify(payload);
            if (url.indexOf('?') > -1) {
                url += '&=' + getParams;
            } else {
                url += '?' + getParams;
            }
        } else if ('post' === type) {
            if (payload instanceof FormData) {
                params = payload;
                config = Object.assign({}, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }, config);
            } else {
                params = qs.stringify(payload);
                config = Object.assign({}, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }, config);
            }
        }
        // 防止重复点击
        if (needStopRepeat) {
            if (stopRepeatRequest) {
                return new Promise(r => { });
            }
            stopRepeatRequest = true;
        }
        return axios[type](url, params, config)
            .then(checkStatus)
            .then(parseJSON)
            .then(checkFlag.bind(this, url))
            .then(data => data)
            .catch(err => {
                throw err;
            });
    }
}

export default {
    get: request('get'),
    post: request('post')
};
