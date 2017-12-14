import User from '../model/User';
import uuidv1 from 'uuid/v1';

//登录函数
export async function login(ctx) {
  console.log(ctx.request.body, "-----1-2-----");

  let phone = ctx.request.body.phone;
  let password = ctx.request.body.password;

  try {
    let result = await User.findOne({
      where: {
        phone,
        password
      }
    });
    if (result) {
      ctx.status = 200;
      ctx.body = {
        data: {
          token: result.token
        },
        status: "ok",
        message:"验证成功"
      }

    } else {
      ctx.status = 403;
      ctx.body = {
        status: "error",
        data:{},
        message: "用户名或者密码错误"
      }
    }
  }
  catch (err) {
    throw (500, {status: "服务器发生错误"}, err.message);
  }
}

//注册函数
export async function reg(ctx) {
  try {
    await User.create({
      phone: "17816890887",
      password: "yjs10086",
      token: "hello " + uuidv1()
    });
  }
  catch (err) {
    throw (500, {status: "服务器发生错误"}, err.message);
  }
}