/**
 * Created by yzdd on 2017/12/15.
 */
import React, {Component} from 'react';
import route from '../../util/routerDecorator';
import {Button, List, WhiteSpace} from 'antd-mobile';
import {QuanList} from "../../logics/quan";


@route("Home")
export default class Home extends Component {
  QuanList = new QuanList();

  async componentWillMount() {
    await this.QuanList.getList();
    console.log(this.QuanList)
  }

  checkQuan = (uuid) => {
    console.log(uuid);
  }

  render() {
    return (
      <div>
        {
          this.QuanList.list.map((v, i) =>
            <div>
              <Button type="primary" onClick={() => this.checkQuan(v.uuid)}>{v.uuid}</Button><WhiteSpace/>
            </div>
          )
        }
      </div>
    );
  }
}
