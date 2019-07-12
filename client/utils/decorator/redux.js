import React from 'react';
import { connect } from 'react-redux';

const defaultMapStateToProps = name => state => {
    let path = './pages/' + name; // 这个路径是相对于index和页面来说的，即在index中传入的页面路径
    return {
        global: state.global,
        self: state[path]
    }
}

const defaultMapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch
    };
}

const redux = (mod, name) => {
    if(!name) {
        console.error('请为 @redux 传入name 参数');
    }
    mod = mod.default || mod;
    // if (!mod instanceof React.Component) {
    //     throw new Error('redux must wrap a ReactComponent');
    // }

    let s2p = mod.mapStateToProps || defaultMapStateToProps(name);
    let d2p = mod.mapDispatchToProps || defaultMapDispatchToProps;
    return connect(s2p, d2p)(mod);

}

export { redux };
export default redux;