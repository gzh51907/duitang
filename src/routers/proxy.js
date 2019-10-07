const express = require('express');
const Router = express.Router();
const proxy = require('http-proxy-middleware');

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

// 使用路由
app.use(Router)

app.listen(1907, () => {
    console.log(`server is runing on port 1907`)
})