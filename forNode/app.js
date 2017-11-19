var express = require('express');  // 用来引入express模块
var app = express();//新建一个express实例
var request = require("superagent");
const cheerio = require('cheerio');
var fs = require("fs");

// 浏览器请求报文头部部分信息
var browserMsg = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
  'Content-Type': 'application/x-www-form-urlencoded'
};


const url = "https://nodelover.me";

var downloadPic = function (src, dest) {
  request(src).pipe(fs.createWriteStream(dest)).on('close', function () {
    console.log('pic saved!')
  })
}

const base_config = {
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "zh-CN,zh;q=0.9",
  "Cache-Control": "max-age=0",
  "Connection": "keep-alive",
  "Host": "nodelover.me",
  "Origin": "https://nodelover.me",
  "Cookie": "EGG_SESS=i5zf542Hv3BQTf6rvkatyhqfRGsB4g8sJ3r_bov-ePo5u0_x6yXNqCO5DGFOjG5FYNHb7WrTOGyOo4SbB-s9fmcR045sxwOPSxVvd96AVNCIRQLGoBiYq4RoKHtTem0rpqWC7BBgXbBANwVWplnDzRuqixV3YRUlSQPptX64dzZJxyWhm6-ASGveR8AiydGR_mB0eZY5wJ63FioYbdeRp2Tiw7wDgeWL9AqiAeI1hJCUO_bFQ8twrWe_q-Vd1owVKOdCGbbGzZXp-uDsGLt9PDyh5mU-W6jNYdmt8GWHl4iyrJXb9Nk5gaKS5eUdPjS010_1zgYG7o-rQX0MieFx5Q9v-V-myCqtiFmmjPthi4CqCxKFiM5TKQ50YZtzozAQWdanEeG9aOBpA-4NYOpuAWPNSaW3_mS5AVPDzWxEmxCYWq3jcaiRtShNyRae8rMYj-rdPeJ63ZTprYD5kclWTkZSXAHWTAlYQ3WEDNPESd08BeY5ZNm7XXV05pyn1qUGGxl9ScdaT2QFQoL0JDrJAKbATehoGzXH6szylAhjml0hcAvdbg5Hme1ZyJvCGKB4MGDGBCwQcA8LtSkHoEJ1U2r9VHYoPRY3Z8Cvi-NY9AxYOENR-hV2iF8g6nRYndhT7bz8uBmaWNdd4N659QTdJD06dlqPm6OxSShW-_f4mPRDpU4oWplY4by8AG2HbbJA9KA2etle-z5kkm4tjLwHzC2rad2J7oRilUMHvm_hUztjbmd5Nnd5Z7y1hmlau2dfzmu_nZFXbwIUAKNXEQV7tlVh1gC2II6emF1vI084q4q60TYT0O37EJaPCFMeV29g5SEWtcraWI0WMSy17HYYegXGHNLq9OlESFLElBGekvmB93_sBA7IbdKxtf_IKEcPh5VfgdwqoW-dEvFW7O5s9wW9egJjTv8yJ0HevDxVYNi9KcPiiFlizUmOP9tFOc9DjGrA0gg-j2Ar8MT6aKOAtDkOO13EXzNquxX-Zrl9QbgEctzSL1ItSzea_qkvD-D2n8OBFoivgL8soH3KhjH41T6K-LZR0KwQlYAm8drOIg0=; Hm_lvt_6e50fd7df77674a3a4dc50ea83a3fff3=1511005132,1511005143,1511005160,1511005187; Hm_lpvt_6e50fd7df77674a3a4dc50ea83a3fff3=1511012336",
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"
};

app.get("/", function (req, res) {
  request.get(url + "/courses")
    .set(base_config)
    .end(function (err, res) {

      const $ = cheerio.load(res.text, {decodeEntities: false});

      var array = [];

      $("li.course-item").each(function (i, e) {
        var url = $(e).find('a').attr("href");
        array.push(url);
      });

      array.forEach(function (v, i) {
        new Promise(function (resolve, reject) {
          console.log(v,i,"----");
          request.get(url + v)
            .set(base_config)
            .end(function (err, res) {

              const $ = cheerio.load(res.text, {decodeEntities: false});
              var title = $('div.banner').find('h4').text();
              if (!fs.existsSync('./' + title)) {
                fs.mkdirSync('./' + title);
              }
              $('ul.video-list').find('li').each(function (i, e) {
                var utl = $(e).find('a').attr("href");
                // console.log(url + utl,"----1--2-3-----");

                request.get(url + utl)
                  .set(base_config)
                  .end(function (err, res) {

                    const $ = cheerio.load(res.text, {decodeEntities: false});

                    // var fileName = $("div.container").find('h1').text();

                    // var url = $('video').find('source').attr("src");
                    // console.log('https:' + url, "---这边的话是下载路径");
                    // console.log('./' + title + "/" + myTrim(fileName) + ".mp4", "---保存路径");

                    // downloadPic('https:' + url, './' + title + "/" + fileName + ".mp4");
                  })
              })
            });
        });
      });
    });
  res.end();
});

function myTrim(x) {
  return x.replace(/^\s+|\s+$/gm, '');
}

app.listen("3000", function () {
  console.log("网站实例跑通了");
});