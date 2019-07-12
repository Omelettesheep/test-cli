import CONSTACTIONS from '@constActions';
import { call, put, takeEvery } from 'redux-saga/effects'
import request from '@utils/request'


function *fetchDemoName(action) {
    try {
        let url = 'https://www.easy-mock.com/mock/5d1d8b7dc45e4c1a8bffc7cd/getDemoName';
        const resp = yield call(request.get, url, action.payload);
        yield put({ type: CONSTACTIONS.API.GET_PAGE_NAME + '__SET', data: resp.data });
    } catch (error) {
        // yield put({type: 'FETCH_FAIL', error});
        throw Error(error);
    }
}

function* watch() {
    yield takeEvery(CONSTACTIONS.API.GET_PAGE_NAME, fetchDemoName);
}

export {watch};