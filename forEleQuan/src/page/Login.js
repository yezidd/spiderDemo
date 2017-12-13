/**
 * Created by yzdd on 2017/12/12.
 */
import React, {Component} from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import {List, InputItem} from 'antd-mobile';
import {observer} from 'mobx-react';
import {LoginForm} from "../logics/auth";
import {Toast} from 'antd-mobile';

@observer
export default class Login extends Component {

  LoginForm = new LoginForm();

  login = async () => {
    console.log("---12---3--4");
    console.log(this.LoginForm);
    try {
      Toast.loading();
      await this.LoginForm.login();
      setTimeout(() => {
        Toast.hide();
      }, 3000);

    }
    catch (err) {
      Toast.info(err.message);
    }
  };

  render() {
    return (
      <div>
        <img src="https://fuss10.elemecdn.com/3/80/71fa998217cb1b32874bdfc35bb26jpeg.jpeg?imageMogr/format/webp/"
             alt="券妈妈"
             style={{height: "50%", width: "100%"}}
        />
        <List renderHeader={() => '券妈妈一键登录收红包'}>
          <InputItem
            clear
            onChange={(text) => this.LoginForm.phone = text}
            placeholder="请输入手机号"
            ref={el => this.autoFocusInst = el}
          >手机号</InputItem>
          <InputItem
            type="password"
            clear
            onChange={(text) => this.LoginForm.password = text}
            placeholder="请输入密码"
            ref={el => this.customFocusInst = el}
          >密码</InputItem>
          <List.Item>
            <div
              style={{width: '100%', color: '#108ee9', textAlign: 'center'}}
              onClick={this.login}
            >
              登录
            </div>
          </List.Item>
        </List>
      </div>
    );
  }
}
