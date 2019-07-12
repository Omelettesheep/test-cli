import CONSTACTIONS from '@constActions';
import { call, put, takeEvery } from 'redux-saga/effects'
import request from '@utils/request'
import { forEach } from 'lodash';

export function* ajaxSaga(action) {
    if (!action.__use_default) {
        return;
    }
    try {
        if (!action.type) {
            throw Error('need type');
        }
        let method = request.get;
        if (action.method === 'POST') {
            method = request.post;
        }
        const resp = yield call(method, action.url, action.data);
        if (+resp.errno !== 0) {
            yield put({
                type: 'FETCH_FAIL',
                action: action
            });
        } else {
            let data = resp.data || resp.ret;
            if (action.adapter) {
                data = action.adapter(data);
            }
            let nextAction = {
                type: action.type + '__SET',
                data: data,
                key: action.key
            };
            forEach(action, (value, key) => {
                // 灌入所有以__开头的key到reducer；
                if (/^__/.test(key)) {
                    nextAction[key] = value;
                }
            });
            yield put(nextAction);
        }
    } catch (error) {
        yield put({ type: 'FETCH_FAIL', error });
    }
}

// function *watch (type) {
//     yield takeEvery(type, ajaxSaga);
// }

const watch = (type) => {
    return function* () {
        yield takeEvery(type, ajaxSaga);
    }
}

export function injectSaga(store, pages) {
    pages.map(page => {
        try {
            var sagas = require(page + '/saga');
            if(sagas) {
                forEach(sagas, store.runSaga);
            }
        } catch (error) {
            console.log(error);
        } finally {
            return false;
        }
    })
    forEach(CONSTACTIONS.API, (k, v) => {
        store.runSaga(watch(v))
        // store.runSaga(watch.bind(this, v))
    })
}

export default injectSaga;
