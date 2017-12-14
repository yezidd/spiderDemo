const request = require("superagent");

const cheerio = require("cheerio");

const Async = require("async");

const fs = require("fs");

const db = require("./util/db");

const Quan = require('./model/Quan');

const url_home = "http://www.quanmama.com/quan_ele_me";

const url_data = [];

//获取到券妈妈页面的主页信息
//提取相互想要的饿了么券的项目
function getItem(callback) {
  request.get(url_home)
    .end(function (err, res) {
      if (err) {
        console.log("发生错误");
      }
      // console.log(res.text);


      const $ = cheerio.load(res.text, {decodeEntities: false});

      $("ul#J_CouponsList").find("li").each(function (i, e) {
        let url = $(e).find("a").attr("href");
        url_data.push({
          home_url: url,
          index: i
        });
      });
      callback(null, url_data);
    })
}

function getQuanUrl(item, callback) {
  // console.log(item);
  request.get(item.home_url)
    .end(function (err, res) {
      if (err) {
        console.log("发生错误");
      }
      const $ = cheerio.load(res.text, {decodeEntities: false});

      let urlItem = $("div.buy").find('a').attr("href");
      // console.log(decodeURIComponent(urlItem));
      url_data[item.index].url_item = decodeURIComponent(urlItem);
      callback(null, "wancheng");
    });
}

//将uuid存储到数据库中
async function saveInSql(item, callback) {
  let match = item.url_item.match(/group_sn=([0-9|a-z]{32})/ig);
  console.log("----12---", match)
  if (match) {
    try {
      let data = await Quan.findOne({where: {uuid: match[0].split("=")[1]}, raw: true});
      if (data) {
        //存在的话就不重新存储了
      } else {
        await Quan.create({
          uuid: match[0].split("=")[1]
        });
      }
      console.log("----完成---")
      callback(null, "完成")
    }
    catch (err) {
      console.log("错误---", err.message);
      callback(err, err.message);
    }
  } else {
    console.log("----完成无数据---")
    callback(null, "完成无数据")
  }
}

//函数主入口
function run() {
  db
    .authenticate()
    .then(() => {
      console.log('success');
    })
    .catch(err => {
      console.error('not success:', err);
    });
  Async.waterfall([
    function (done) {
      getItem(done)
    },
    function (data, done) {
      Async.eachSeries(data, getQuanUrl, function () {
        done(null, url_data)
      });
      // done(null, "完成");
    },
    function (data, done) {
      Async.eachSeries(data, saveInSql, function () {
        done(null, url_data);
      })
    }
  ], function (err, result) {
    if (err) {
      console.log("发生错误");
    }
    fs.writeFileSync("data.json", JSON.stringify(result), 'utf-8');
  });
}

run();