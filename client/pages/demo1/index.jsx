import React from 'react';
import { Button } from 'antd';
import request from '@utils/request';

export default class Demo1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        // 试试本地Mock
        request.get('/mock/user.json').then(res=> {
            console.log(`当前时间 ${Date.now()}: yangyi20最美 debug 的数据是 res: `, res)
        });

        // 试试easy mock
        request.get('https://www.easy-mock.com/mock/5d14a54e94d3053851e1023b/v1/userInfo').then(res => {
            console.log(`当前时间 ${Date.now()}: yangyi20最美 debug 的数据是 res: `, res)
        })
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