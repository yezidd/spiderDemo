"use strict";

var request = require("superagent");

var cheerio = require("cheerio");

var Async = require("async");

var fs = require("fs");

var url_home = "http://www.quanmama.com/quan_ele_me";

var url_data = [];

//获取到券妈妈页面的主页信息
//提取相互想要的饿了么券的项目
function getItem(callback) {
  request.get(url_home).end(function (err, res) {
    if (err) {
      console.log("发生错误");
    }
    // console.log(res.text);


    var $ = cheerio.load(res.text, { decodeEntities: false });

    $("ul#J_CouponsList").find("li").each(function (i, e) {
      var url = $(e).find("a").attr("href");
      url_data.push({
        home_url: url,
        index: i
      });
    });
    callback(null, url_data);
  });
}

//获取每一个item的详细信息
function getItemInfo(onearg, done) {}

function getQuanUrl(item, callback) {
  console.log(item);
  request.get(item.home_url).end(function (err, res) {
    if (err) {
      console.log("发生错误");
    }
    var $ = cheerio.load(res.text, { decodeEntities: false });

    var urlItem = $("div.buy").find('a').attr("href");
    // console.log(urlItem);
    url_data[item.index].url_item = urlItem;
    callback(null, "wancheng");
  });
}

//函数主入口
function run() {
  Async.waterfall([function (done) {
    getItem(done);
  }, function (data, done) {
    Async.eachSeries(data, getQuanUrl, function () {
      done(null, url_data);
    });
    // done(null, "完成");
  }], function (err, result) {
    if (err) {
      console.log("发生错误");
    }
    fs.writeFileSync("data.json", JSON.stringify(result), 'utf-8');
  });
}

run();