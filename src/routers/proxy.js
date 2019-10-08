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
        "^/duit": "/"
    }
});

Router.get('/duit/*', kadMiddleware, (req, res) => {
    res.send('data')
})

Router.get('/creeper/:id', (req, res) => {
    request('https://m.duitang.com/blog/?id=1129008001', (err, resp, body) => {
        let $ = cheerio.load(body);//cheerio使用jq封装的一个模块
        // 遍历每一个商品
        let goodlist = [];
        $('.goods-list-v2 ul li').each((index, item) => {
            console.log(666)
            let $li = $(item);
            console.log($li);
            let imgsrc = $li.find('.gl-i-wrap .p-img a img').attr('src');//图片路径
            //  提取文件名：
            let fileName = path.basename(imgsrc);
            let goods = {
                price: $li.find('.p-price strong i').text(),
                VIPprice: $li.find('.p-price span em').text(),
                name: $li.find('.p-name a em').text(),
                comment: $li.find('.p-commit strong a').text(),
                shop: $li.find('.p-shop span a').text(),
                imgsrc: 'imgs/' + fileName
            };
            goodlist.push(goods);
            request(imgsrc).pipe(fs.createWriteStream('./imgs/' + fileName));
        });
        res.send(goodlist);
    })
});

// 使用路由
app.use(Router)

app.listen(1907, () => {
    console.log(`server is runing on port 1907`)
})