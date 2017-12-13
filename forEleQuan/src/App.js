/**
 * Created by yzdd on 2017/12/11.
 */
import React, {Component} from 'react';
import data from '../server/data.json';
import Login from "./page/Login";


export default class App extends Component {
  render() {
    console.log(data);
    return (
      <div>
        <Login/>
      </div>
    );
  }
}
