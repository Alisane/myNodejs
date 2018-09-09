//根据用户的不同请求，服务器作出不同的响应
//1.加载http模块
var http = require("http");
//2.创建一个http服务对象
http.createServer(function (req,res) {
    // //拿到用户请求的路径
    // console.log(req.url);
    // //结束响应
    // res.end();
    //根据不同的用户请求的路径，响应不同的内容
    res.setHeader("Content-Type","text/html; charset=utf-8");
    if (req.url === '/' || req.url === '/index') {
        res.end('hello index');
    } else if(req.url === '/login') {
        res.end('hello login');
    } else if(req.url === '/list') {
        res.end('hello list');
    } else if(req.url === '/register') {
        res.end('hello register');
    } else{
        res.end("404.not found 客户端错误")
    }
}).listen(8080,function () {
    console.log('http://localhost:8080');
});
