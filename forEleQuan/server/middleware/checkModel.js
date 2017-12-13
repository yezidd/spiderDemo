import fs from 'fs';
import db from '../util/db'

//通过node中的扫描文件来导入model中所有的文件进行数据库的建立
export default async function checkModel() {
  console.log("这边就是model所有的文件");
  fs.readdir(process.cwd()+"/server/model", 'utf-8', function (err, data) {
    console.log(data)
    for (let modelName of data) {
      let model = require(process.cwd() + '/server/model/' + modelName);
    }
    db.sync();
    console.log('init db ok.');
  });

}