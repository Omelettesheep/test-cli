import React from 'react';
import { Button } from 'antd';
import request from '@utils/request';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import {getTodoList} from './actions';

class Demo2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.actions.getTodoList();
    }

    redirect = () => {
        this.props.history.push('/');
    }

    render() {
        const { params = {} } = this.props
        const {list=[]} = params;
        console.log(`当前时间 ${Date.now()}: yangyi20最美 debug 的数据是 list: `, list)
        return (
            <div>
                <Button type="primary" onClick={this.redirect}>点击跳转到首页</Button>
                this is demo2
                {list.map(item => (
                    <div key={Math.random()}>
                        {`${item.id}-${item.name}`}
                    </div>
                ))}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        params: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({getTodoList}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Demo2)