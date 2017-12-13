import {observable} from 'mobx';
import URI from 'urijs';
import {post} from "./rpc";

export class LoginForm {
  phone;
  password;

  async login() {
    const uri = new URI("/login");
    try {
      let result = await post(uri, {
        phone: this.phone,
        password: this.password
      });
      console.log(result);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
