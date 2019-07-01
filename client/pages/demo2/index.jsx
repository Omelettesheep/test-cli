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
            type: CONSTACTIONS.API.GET_TODOLIST
        })
    }

    render() {
        const {params={}} = this.props;
        const { list } = params;
        return (
            <div>
                <Link to="/">home</Link>
                this is demo2
                {list.map(item => {
                    return <div>{`${item['id']}-${item['name']}`}</div>
                })}
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
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Demo2)