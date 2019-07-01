import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <Link to="/demo1">demo1</Link>
                <Link to="/demo2">demo2</Link>
                this is home
            </div>
        );
   }
}