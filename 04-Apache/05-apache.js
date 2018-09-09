//根据不同的用户请求的路径，响应不同的html内容
var http = require("http");
var fs = require("fs");
var path = require("path");
var mime = require("mime");
//2.创建一个http服务对象
http.createServer(function (req,res) {
    // 1.拿到用户请求的路径req.url
    //2.获取public目录的完整路径
    var publicDir = path.join(__dirname,"public");
    //3.根据public的路径肯用户请求的路径，最终计算出用户请求的静态资源的完整路径
    var filename = path.join(publicDir,req.url);
    //4.根据文件的完整路径去读取该文件
    fs.readFile(filename,function (err,data) {
        if(err){
            res.end("文件不存在！");
        }else {
            //通过第三方模块
            res.setHeader("Content-Type", mime.getType(filename));
            res.end(data);
        }
        });
}).listen(9090,function () {
    console.log('http://localhost:9090');
});

//当前项目（包）的入口文件
//1.加载http模块
var http = require("http");
var fs = require("fs");
var path = require("path");
//2.创建服务
http.createServer(function(req,res) {
    //3.设计路由
    //当用户请求/或/index，响应新闻列表-get
    //当用户请求/item，响应新闻详情-get
    //当用户请求/submit，响应新闻添加页面-get
    //当用户请求/add，将用户提交的新闻保存到data.json文件中 -get
    //当用户请求/add，将用户提交的新闻保存到data.json文件中 -post

    //4.先根据用户请求的路径（路由），将对应的html页面显示出来
    //将用户请求的url转为小写字母
    req.url = req.url.toLowerCase();
    req.url = req.method.toLowerCase();
    if(req.url === '/' || req.url === '/index' && req.method === 'get') {
        console.log("http://localhost:90901");
        //读取index.html并返回
        fs.readFile(path.join(__dirname, 'views', 'index.html'), function (err, data) {
            if (err) {
                throw err;
            }
            res.end(data);
        });
    } else if(req.url === '/submit' && req.method === 'get'){
        //读取submit.html并返回
        fs.readFile(path.join(__dirname,'views','submit.html'),function (err,data) {
            if(err){
                throw err;
            }
            res.end(data);
        });
    } else if(req.url === '/item' && req.method === 'get') {
        //读取details.html并返回
        fs.readFile(path.join(__dirname,'views','details.html'),function (err,data) {
            if(err){
                throw err;
            }
            res.end(data);
        });
    } else if(req.url === '/add' && req.method === 'get') {
        //读取add.html并返回
    } else if(req.url === '/add' && req.method === 'post') {
        //读取add.html并返回
    } else {
        res.writeHead(404,'not found',{
            'Content-Type':'text/html;charset=utf-8'
        });
    }
}).listen(9090,function () {
    console.log("http://localhost:90902");
});
