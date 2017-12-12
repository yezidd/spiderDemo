export async function checkToken(ctx, next) {
  console.log(ctx.request.header.authorization);
  if (ctx.request.header.authorization) {
    await next();
  } else {
    ctx.throw (401, {}, "token 验证失败");
  }

}