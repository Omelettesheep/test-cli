import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import Layout from './layout';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer'

// const appCreateStore = compose(
//     applyMiddleware(thunk),
//     window.devToolsExtension ? window.devToolsExtension() : f => f
// )(createStore)

const store = createStore(
    reducer,
    applyMiddleware(thunk) // applyMiddleware可以使用中间件模块
);

// const store = appCreateStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <Layout {...store} />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
