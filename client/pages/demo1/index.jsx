import React from 'react';
import { Button } from 'antd';

export default class Demo1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    redirect = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.redirect}>点击跳转到首页</Button>
                this is demo1
                <div>带的参数是：{this.props.match.params.id}</div>
            </div>
        );
   }
}