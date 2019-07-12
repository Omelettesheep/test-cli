import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        const { width, height } = this.props;
        let style = {};
        if (width) {
            style['width'] = width;
        }
        if (height) {
            style['height'] = height;
        }
        return (
            <div className="_namespace">
                <div className="loading-container" style={style}>
                    <span className="loading" />
                </div>
            </div>
        );
    }
}

const propTypes = {
    width: PropTypes.string, // 100%, 100px
    height: PropTypes.string // 100%, 100px
};

Loading.propTypes = propTypes;
export default Loading;
