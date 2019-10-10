const express = require('express');
const Router = express.Router();
const proxy = require('http-proxy-middleware');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const app = express();

// 静态资源服务器
// 网站根目录
app.use(express.static('./'));

Router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,PATCH,POST,GET,DELETE,OPTIONS");

    // 跨域请求CORS中的预请求
    if (req.method == "OPTIONS") {
        res.sendStatus(200);/*让options请求快速返回*/
    } else {
        next();
    }
})

let kadMiddleware = proxy({
    // 目标网址
    target: 'https://m.duitang.com',
    // 修改请求源地址
    changeOrigin: true,
    pathRewrite: {
        "^/duit": ""
    }
});

Router.get('/duit/*', kadMiddleware, (req, res) => {
    res.send('data')
})

Router.get('/creeper', (req, res) => {
    let {id} = req.query;
    request(`https://m.duitang.com/blog/?id=${id}`, (err, resp, body) => {
        let $ = cheerio.load(body);//cheerio使用jq封装的一个模块
        // 遍历每一个商品
        let imgsrc = $('.css-8atqhb.e1cybf983').attr('src');//图片路径
        let picTitle = $('.css-62x3yt.e1cybf984').text();
        let gotoH = $('.userName').attr('href');//去到个人页面
        let humName = $('.userName h5').text();
        let humPic = $('.css-1irt2zo.e1cybf985 a img').attr('src');
        let humColl = $('.collectTo span').text();
        let gotoC = $('.collectTo').attr('href');//去到收藏夹
        let pDate = $('.css-1byvyem.e1cybf986').text();
        let aTage = [];
        $('.tag.am-tag.am-tag-normal .am-tag-text').each((index, item) => {
            let tages = {
                tageName: $(item).text()
            };
            aTage.push(tages);
        });
        let colNum = $('.am-flexbox.am-flexbox-justify-between.am-flexbox-align-center span').text().replace(/[^0-9]/ig,"");
        let ali = [];
        $('.css-1nlif61.e6c17h94 li').each((index, item) => {
            let $li = $(item);
            let colls = {
                cover: $li.find('.css-x5e2fy.e6c17h90').attr('src'),//图片路径
                collName: $li.find('.css-xblt0y.e6c17h92').text(),
                collHum: $li.find('.css-10joy7a.e6c17h93').text(),
            };
            ali.push(colls);
        });
        let inf = {
            imgsrc,
            picTitle,
            gotoH,
            humName,
            humPic,
            humColl,
            gotoC,
            pDate,
            aTage,
            colNum,
            ali
        }
        res.send(inf);
    })
});

// 使用路由
app.use(Router);

app.listen(1907, () => {
    console.log(`server is runing on port 1907`)
})