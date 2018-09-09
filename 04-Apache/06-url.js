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
            //通过第三块模块
            res.setHeader("Content-Type", mime.getType(filename));
            res.end(data);
        }
    });
}).listen(9090,function () {
    console.log('http://localhost:9090');
});
