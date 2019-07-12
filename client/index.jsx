import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import Layout from './layout';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducer';
import injectSaga from './saga';
const pages = [
    './pages/demo2'
];
const rootReducer = createReducer(pages);
const sagaMiddleware = createSagaMiddleware() // 创建saga中间件
// 支持使用redux开发者工具
const appCreateStore = compose(applyMiddleware(sagaMiddleware), window.devToolsExtension
    ? window.devToolsExtension()
    : f => f)(createStore);
const store = appCreateStore(rootReducer);

store.runSaga = sagaMiddleware.run;


injectSaga(store, pages);

ReactDOM.render(
    <Provider store={store}>
        <Layout {...store} />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
