import {observable} from 'mobx';
import URI from 'urijs';
import {post, get} from "./rpc";


export class QuanList {
  @observable
  list = [];

  async getList() {
    const uri = new URI("/quan").query({
      page: 1,
      pageSize: 10
    });
    try {
      let list = await get(uri);
      console.log(list);
      list.data.forEach((v, i) => {
        this.list.push(new QuanItem().from(v));
      });
    } catch (err) {
      throw new Error("发生错误");
    }
  }
}

export class QuanItem {

  id;

  uuid;
  time;

  createdAt;

  from(obj) {
    this.id = obj.id;
    this.uuid = obj.uuid;
    this.time = obj.time;
    this.createdAt = obj.createdAt;

    return this;
  }
}
