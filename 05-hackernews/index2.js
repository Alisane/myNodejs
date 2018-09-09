// 当前项目（包） 的入口文件
//封装一个render()函数
//将render函数挂到res对象上，可以通过res.render()来访问
// 1. 加载 http 模块
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');

// 2. 创建服务
http.createServer(function (req, res) {
    // 要在这里写大量的代码
    res.render = function (filename) {
        fs.readFile(filename, function (err, data) {
            if (err) {
                res.writeHead(404, 'Not Found', {'Content-Type': 'text/html;charset=utf-8'});
                res.end('404, not found.');
                return;
            }
            res.setHeader('Content-Type', mime.getType(filename));
            res.end(data);
        });
    };

    req.url = req.url.toLowerCase();
    req.method = req.method.toLowerCase();
    // 先根据用户请求的路径（路由），将对应的HTML页面显示出来
    if (req.url === '/' || req.url === '/index' && req.method === 'get') {
        // 读取 index.html 并返回
        res.render(path.join(__dirname, 'views', 'index.html'));
    } else if (req.url === '/submit' && req.method === 'get') {
        // 读取 submit.html 并返回
        res.render(path.join(__dirname, 'views', 'submit.html'));
    } else if (req.url === '/item' && req.method === 'get') {
        // 读取 details.html 并返回
       res.render(path.join(__dirname, 'views', 'details.html'));
    } else if (req.url === '/add' && req.method === 'get') {
        // 表示 get 方法提交一条新闻
    } else if (req.url === '/add' && req.method === 'post') {
        // 表示 post 方法提交一条新闻
    } else if (req.url.startsWith('/resources') && req.method === 'get') {
        // 如果用户请求是以 /resources 开头，并且是 get 请求，就认为用户是要请求静态资源
        // /resources/images/s.gif
        res.render(path.join(__dirname,req.url));
    } else {
        res.writeHead(404, 'Not Found', {
            'Content-Type': 'text/html; charset=utf-8'
        });
        res.end('404, Page Not Found.');
    }
}).listen(9090, function () {
    console.log('http://localhost:9090');
});