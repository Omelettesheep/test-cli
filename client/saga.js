import CONSTACTIONS from '@constActions';
import { call, put, takeEvery } from 'redux-saga/effects'
import request from '@utils/request'

function* getTodoList(action) {
    try {
        let url = 'https://www.easy-mock.com/mock/5d14a54e94d3053851e1023b/v1/getTodoList'
        const resp = yield call(request.get, url, action.payload);
        yield put({ type: CONSTACTIONS.NORMAL.SET_TODOLIST, data: resp.data });
    } catch (e) {
        throw Error(e);
    }
}


// generator 函数
function* mySaga() {
    yield takeEvery(CONSTACTIONS.API.GET_TODOLIST, getTodoList) // takeEvery捕捉每一个派发出来的action type类型为GET_INIT_LIST的时候，就会执行getInitList方法
}

export default mySaga;
