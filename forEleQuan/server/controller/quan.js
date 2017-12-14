import Quan from '../model/Quan';

//插曲所有券的uuid展示到页面上
//GET offset---->20
//page  pagesize
export async function getQuans(ctx) {
  console.log(ctx.request.query);
  let config = {
    ...ctx.request.query
  };
  try {
    let result = await Quan.findAll({
      offset: Number(config.page * config.pageSize),
      limit: Number(config.pageSize),
      raw: true
    });

    ctx.status = 200;

    ctx.body = {
      status: "ok",
      message: "",
      data: result
    }
  } catch (err) {
    console.log(err.message);
    throw(500, {}, '服务器内部错误');
  }
}