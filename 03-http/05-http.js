//根据不同的用户请求的路径，响应不同的html内容
var http = require("http");
var fs = require("fs");
var path = require("path");
//2.创建一个http服务对象
http.createServer(function (req,res) {
    // //拿到用户请求的路径
    // console.log(req.url);
    // //结束响应
    // res.end();
    //根据不同的用户请求的路径，响应不同的内容
    if(req.url === '/' || req.url === '/index') {
        //读取文件
        fs.readFile( path.join(__dirname,"htmls",'index.html'),function (err,data) {
            if(err){
                throw err;
            }
            res.end(data);
        });
    } else if(req.url==='/login') {
        fs.readFile( path.join(__dirname,"htmls",'login.html'),function (err,data) {
            if(err){
                throw err;
            }
            res.end(data);
        });
    } else if(req.url==='/list') {
        fs.readFile( path.join(__dirname,"htmls",'list.html'),function (err,data) {
            if(err){
                throw err;
            }
            res.end(data);
        });
    } else if(req.url==='/register') {
        fs.readFile( path.join(__dirname,"htmls",'register.html'),function (err,data) {
            if(err){
                throw err;
            }
            res.end(data);
        });
    } else if(req.url==='/images/t.jpg') {
        fs.readFile( path.join(__dirname,"images",'t.jpg'),function (err,data) {
            if(err){
                throw err;
            }
            res.setHeader("Content-type","image/png");
            res.end(data);
        });
    } else if(req.url==='/css/index.css'){
        fs.readFile( path.join(__dirname,"css","index.css"),function (err,data) {
            if(err){
                throw err;
            }
            res.setHeader("Content-type","text/css");
            res.end(data);
        });
    } else{
        fs.readFile( path.join(__dirname,"htmls",'404.html'),function (err,data) {
            if(err){
                throw err;
            }
            res.end(data);
        });
    }
}).listen(9090,function () {
    console.log('http://localhost:9090');
});
