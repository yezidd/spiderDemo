var express = require('express');  // 用来引入express模块
var app = express();//新建一个express实例
var request = require("superagent");
const cheerio = require('cheerio');
var fs = require("fs");
var async = require("async");

// 浏览器请求报文头部部分信息
var browserMsg = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
  'Content-Type': 'application/x-www-form-urlencoded'
};


const URL = "https://nodelover.me";

var ii = 1;

var downloadPic = function (src, dest) {
  request(src).pipe(fs.createWriteStream(dest)).on('close', function () {
    console.log('pic saved!' + ii);
    ii++;
  })
};

const base_config = {
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "zh-CN,zh;q=0.9",
  "Cache-Control": "max-age=0",
  "Connection": "keep-alive",
  "Host": "nodelover.me",
  "Origin": "https://nodelover.me",
  // "Cookie": "EGG_SESS=i5zf542Hv3BQTf6rvkatyhqfRGsB4g8sJ3r_bov-ePo5u0_x6yXNqCO5DGFOjG5FYNHb7WrTOGyOo4SbB-s9fmcR045sxwOPSxVvd96AVNCIRQLGoBiYq4RoKHtTem0rpqWC7BBgXbBANwVWplnDzRuqixV3YRUlSQPptX64dzZJxyWhm6-ASGveR8AiydGR_mB0eZY5wJ63FioYbdeRp2Tiw7wDgeWL9AqiAeI1hJCUO_bFQ8twrWe_q-Vd1owVKOdCGbbGzZXp-uDsGLt9PDyh5mU-W6jNYdmt8GWHl4iyrJXb9Nk5gaKS5eUdPjS010_1zgYG7o-rQX0MieFx5Q9v-V-myCqtiFmmjPthi4CqCxKFiM5TKQ50YZtzozAQWdanEeG9aOBpA-4NYOpuAWPNSaW3_mS5AVPDzWxEmxCYWq3jcaiRtShNyRae8rMYj-rdPeJ63ZTprYD5kclWTkZSXAHWTAlYQ3WEDNPESd08BeY5ZNm7XXV05pyn1qUGGxl9ScdaT2QFQoL0JDrJAKbATehoGzXH6szylAhjml0hcAvdbg5Hme1ZyJvCGKB4MGDGBCwQcA8LtSkHoEJ1U2r9VHYoPRY3Z8Cvi-NY9AxYOENR-hV2iF8g6nRYndhT7bz8uBmaWNdd4N659QTdJD06dlqPm6OxSShW-_f4mPRDpU4oWplY4by8AG2HbbJA9KA2etle-z5kkm4tjLwHzC2rad2J7oRilUMHvm_hUztjbmd5Nnd5Z7y1hmlau2dfzmu_nZFXbwIUAKNXEQV7tlVh1gC2II6emF1vI084q4q60TYT0O37EJaPCFMeV29g5SEWtcraWI0WMSy17HYYegXGHNLq9OlESFLElBGekvmB93_sBA7IbdKxtf_IKEcPh5VfgdwqoW-dEvFW7O5s9wW9egJjTv8yJ0HevDxVYNi9KcPiiFlizUmOP9tFOc9DjGrA0gg-j2Ar8MT6aKOAtDkOO13EXzNquxX-Zrl9QbgEctzSL1ItSzea_qkvD-D2n8OBFoivgL8soH3KhjH41T6K-LZR0KwQlYAm8drOIg0=; ",
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"
};

//定义一个全局的cookie用来验证身份
var cookie_flag;

//定义一个全局的数组
var array_list = [];

var p = new Promise(function (resolve, reject) {

});
//数据的数组
let data = [];


//获取到所有的地址
var array_url = [];

app.get("/", async (req, res) => {
  let result = await getLogin();
  let array = await getArray_list(result.cookie, result._csrf);

  async.eachSeries(array, async function (v, callback) {
    let course_list = await getCourseList(v);
    callback(null, course_list);
  }, function (err, results) {
    console.log(results);
  });

  res.end();
});

//就是爬login页面实现登录状态
async function getLogin() {
  //获取到csrf和token
  let res = await request.get(URL + "/login").set(base_config);
  console.log(res.text);
  //获取到登录页面的时候的html代码
  const $ = cheerio.load(res.text, {decodeEntities: false});
  //现在要获取到csrf Token

  let _csrf = $('input[name=_csrf]').attr('value');
  console.log(_csrf);
  let cookie = res.headers["set-cookie"];
  console.log(cookie[0]);
  return {_csrf, cookie}
}

//async 获取到一个课程的视频列表
async function getCourseList(v) {
  let url_course = [];
  return await new Promise(function (resolve, reject) {
    request.get(v.url)
      .set(base_config)
      .end(function (err, res) {
        const $ = cheerio.load(res.text, {decodeEntities: false});
        var title = $('div.banner').find('h4').text();
        if (!fs.existsSync('./' + title)) {
          fs.mkdirSync('./' + title);
        }
        $('ul.video-list').find('li').each(function (i, e) {
          var utl = $(e).find('a').attr("href");
          url_course.push(URL + utl);
        });
        resolve(url_course)
      })
  });
}

async function getArray_list(cookie, _csrf) {
  let array_list = [];
  return await new Promise((resolve, reject) => {
    console.log("---1-2-3----")
    request.post(URL + "/login").set(base_config)
      .set('Cookie', cookie)
      .type('form')
      .redirects(0)
      .send({
        "email": "3050232357@qq.com",
        "password": "yjs10086",
        "_csrf": _csrf
      }).end((err, result) => {
      //获取到验证的cookie--------->幅值给全局的变量
      cookie_flag = result.headers['set-cookie'];
      console.log("---1-2-3---4-")
      //请求主页然后带上验证的token
      request.get(URL + "/courses")
        .set(base_config)
        .set('Cookie', cookie_flag)
        .end(function (err, res) {
          console.log("---1-2-3--5--")
          const $ = cheerio.load(res.text, {decodeEntities: false});

          console.log(res.text);

          $("li.course-item").each(function (i, e) {

            var url = $(e).find('a').attr("href");
            var title = $(e).find('a').find('h1').text();
            console.log(URL + url + "-----" + title);

            array_list.push({
              url: URL + url,
              title
            });
          });
          console.log(array_list);

          resolve(array_list);
        });
    });
  });

}

async function getVideoUrl(v, title) {
  return new Promise((resolve, reject) => {
    request.get(v)
      .set(base_config)
      .set('Cookie', cookie_flag)
      .end(function (err, res) {
        // console.log(res, "--------")
        try {
          const $ = cheerio.load(res.text, {decodeEntities: false});

          let fileName = $("div.container").find('h1').text();

          let url = $('video').find('source').attr("src");

          console.log('https:' + url, "---这边的话是下载路径");

          console.log('./' + title + "/" + trim(fileName) + ".mp4", "---保存路径");

        }
        catch (err) {
          console.log(err.message, '--错误信息--');
        }
        // downloadPic('https:' + url, './' + title + "/" + fileName + ".mp4");
      })
  })
}

//去除前后空格和&nbsp;转义字符
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '').replace(/&nbsp;/g, '')
}

// request.get(URL + utl)
//   .set(base_config)
//   .set('Cookie', cookie_flag)
//   .end(function (err, res) {
//     console.log(res, "--------")
//     try {
//       const $ = cheerio.load(res.text, {decodeEntities: false});
//
//       var fileName = $("div.container").find('h1').text();
//
//       var url = $('video').find('source').attr("src");
//       console.log('https:' + url, "---这边的话是下载路径");
//       console.log('./' + title + "/" + myTrim(fileName) + ".mp4", "---保存路径");
//     }
//     catch (err) {
//       console.log(err.message, '--错误信息--');
//     }
//     // downloadPic('https:' + url, './' + title + "/" + fileName + ".mp4");
//   })
app.listen("3000", function () {
  console.log("网站实例跑通了");
});