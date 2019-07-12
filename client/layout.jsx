import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import {
    Demo1,
    Home,
    Demo2
} from './pages';

class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Router>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/demo1" component={Demo1}></Route>
                <Route exact path="/demo1/:id" component={Demo1}></Route>
                <Route exact path="/demo2" component={Demo2}></Route>
            </Router>
        );
   }
}

export default Layout;