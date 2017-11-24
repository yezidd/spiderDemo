var request = require("superagent");
var cheerio = require("cheerio");
var async = require("async");
var fs = require("fs");
const URL = "https://nodelover.me";


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

var _csrf = "";
var cookie_flag = "";

//全局的数据变量
var data = [];

//就是爬login页面实现登录状态
async function getLogin(callback) {
  //获取到csrf和token
  let res = await request.get(URL + "/login").set(base_config);
  // console.log(res.text);
  //获取到登录页面的时候的html代码
  const $ = cheerio.load(res.text, {decodeEntities: false});

  //现在要获取到csrf Token---->赋值给全局变量
  _csrf = $('input[name=_csrf]').attr('value');
  // 拿到cookie然后赋值给全局变量
  cookie_flag = res.headers["set-cookie"];

  callback(null, {_csrf, cookie_flag});
}


function getArray_list(arg1, callback) {
  request.post(URL + "/login").set(base_config)
    .set('Cookie', arg1.cookie_flag)
    .type('form')
    .redirects(0)
    .send({
      "email": "3050232357@qq.com",
      "password": "yjs10086",
      "_csrf": arg1._csrf
    }).end((err, result) => {
    //获取到验证的cookie--------->幅值给全局的变量
    cookie_flag = result.headers['set-cookie'];
    // console.log("---1-2-3---4-")
    //请求主页然后带上验证的token
    request.get(URL + "/courses")
      .set(base_config)
      .set('Cookie', cookie_flag)
      .end(function (err, res) {
        // console.log("---1-2-3--5--")
        const $ = cheerio.load(res.text, {decodeEntities: false});

        // console.log(res.text);

        $("li.course-item").each(function (i, e) {

          var url = $(e).find('a').attr("href");
          var title = $(e).find('a').find('h1').text();
          console.log(URL + url + "-----" + title);

          data.push({
            url: URL + url,
            title
          });
        });
        // console.log(array_list);

        callback(null, data)
      });
  });

}

//找到对应的课程列表
function downCourse(course, callback) {
  request.get(course.url)
    .set(base_config)
    .end(function (err, res) {
      const $ = cheerio.load(res.text, {decodeEntities: false});
      var title = $('div.banner').find('h4').text();

      if (!fs.existsSync('./' + title)) {
        fs.mkdirSync('./' + title);
      }
      course.lesson = [];
      $('ul.video-list').find('li').each(function (i, e) {
        var utl = $(e).find('a').attr("href");
        async.waterfall([
          function (callbackNew) {
            getVideoUrl(URL + utl, course.title, callbackNew);
            // callbackNew(null,0)
          },
          function (dest, src, callbackNew) {
            // console.log(dest,src,"--------")
            downloadPic(src, dest, callbackNew);
            // console.log(arg1)
            // callbackNew(null, 0)
          }
        ], function (err, result) {
          console.log("最终结果" + result);
        })
      });
      callback(null, 0);
    })

}

function downloadPic(src, dest, callback) {
  console.log("-----src----")
  // request(src).pipe(fs.createWriteStream(dest)).on('close', function () {
  callback(null, src + 'pic saved!')
  // })
};

function getVideoUrl(url, title, callback) {
  request.get(url)
    .set(base_config)
    .set('Cookie', cookie_flag)
    .end(function (err, res) {
      // console.log(res, "--------")
      try {
        const $ = cheerio.load(res.text, {decodeEntities: false});

        let fileName = $("div.container").find('h1').text();

        let url = $('video').find('source').attr("src");

        var name = "http:";

        if (url.indexOf(name) !== -1) {
          callback(null, './' + title + "/" + myTrim(fileName) + ".mp4", url)
        }
        else {
          callback(null, './' + title + "/" + myTrim(fileName) + ".mp4", 'https:' + url)
        }
      }
      catch (err) {
        console.log(err.message, '--错误信息--');
      }
    })
}

function myTrim(x) {
  return x.replace(/^\s+|\s+$/gm, '');
}

//主函数
async function run() {
  async.waterfall([
    function (callback) {
      getLogin(callback)
    },
    function (arg1, callback) {
      getArray_list(arg1, callback)
    },
    function (arg1, callback) {
      async.eachSeries(data, downCourse, callback);

    },
  ], function (err, result) {
    if (err) {
      console.log("登录下载课程列表出现问题:" + err.message);
    } else {
      console.log("jieguo", data);
    }
  });

}

run();