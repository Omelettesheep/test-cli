import React from 'react';
import CONSTACTIONS from '@constActions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'


class Demo2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    componentDidMount() {
        this.props.dispatch({
            type: CONSTACTIONS.API.GET_TODOLIST,
            url: 'https://www.easy-mock.com/mock/5d14a54e94d3053851e1023b/v1/getTodoList',
            method: 'GET',
            __use_default: true
        })

        this.props.dispatch({
            type: CONSTACTIONS.API.GET_PAGE_NAME,
            method: 'GET',
        })
    }

    render() {
        const { global={} } = this.props;
        const { self={} } = this.props;
        const { list } = global;
        return (
            <div>
                <Link to="/">home</Link>
                this is demo2
                <div>
                    这是全局数据global.list
                    {list.map((item,index) => {
                        let key = `demo2-${index}`;
                        return <div key={key}>{`${item['id']}-${item['name']}`}</div>
                    })}
                </div>
                <div>
                    这是局部数据self.name
                    {self.name}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        global: state.global,
        self: state['./pages/demo2']
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Demo2)