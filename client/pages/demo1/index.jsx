import React from 'react';

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
                <button onClick={this.redirect}>点击跳转到首页</button>
                this is demo1
                <div>带的参数是：{this.props.match.params.id}</div>
            </div>
        );
   }
}