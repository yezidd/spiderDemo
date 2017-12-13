export async function checkToken(ctx, next) {
  console.log(ctx.request.header.authorization);
  if (validateAuth(ctx.request.header.authorization)) {
    console.log("验证成功");
    await next();
  } else {
    console.log("验证失败");
    ctx.throw(401, {}, "token 验证失败");
  }
}

//检查header中auth的正确性
function validateAuth(authorization) {
  if (authorization.substring(0, 6) === "hello " && authorization.length > 10) {
    return true;
  } else {
    return false;
  }
}