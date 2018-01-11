/**
 * Created by yzdd on 2017/12/11.
 */
import React, {Component} from 'react';
import data from '../server/data.json';
import Login from "./page/auth/Login";
import Home from "./page/check/Home";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Test from "./page/Test";

export default class App extends Component {

  render() {
    console.log(data);
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login}/>
          <Route exact path="/home" component={Home}/>
        </div>
      </Router>
    );
  }
}

