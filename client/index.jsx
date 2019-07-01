import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import Layout from './layout';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer'
import mySaga from './saga';

const sagaMiddleware = createSagaMiddleware() // 创建saga中间件
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga)

ReactDOM.render(
    <Provider store={store}>
        <Layout {...store} />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
