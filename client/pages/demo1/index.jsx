import React from 'react';
import { Button } from 'antd';
import Loading from '@components/loading';
import request from '@utils/request';

export default class Demo1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        // 试试本地Mock
        request.get('/mock/user.json').then(res=> {
            console.log('res: ', res);
        });

        // 试试easy mock
        request.get('https://www.easy-mock.com/mock/5d14a54e94d3053851e1023b/v1/userInfo').then(res => {
            console.log('res: ', res)
        })
    }

    redirect = () => {
        this.props.history.push('/');
    }

    handleUserChange = () => {
        this.props.dispatch({
            type: 'SET_USER_NAME',
            data: `yangyi${Math.floor(Math.random() * 100)}`
        })
    }

    render() {
        const { global={} } = this.props;
        const { name } = global;
        return (
            <div>
                <Button type="primary" onClick={this.redirect}>点击跳转到首页</Button>
                this is demo1
                <div>带的参数是：{this.props.match.params.id}</div>
                <div><Button type="primary" onClick={this.handleUserChange}>点击修改user</Button></div>
                <div>{name}</div>
                <Loading />
            </div>
        );
   }
}