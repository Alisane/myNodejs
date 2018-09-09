//1.加载http模块
var http = require('http');
//2.创建一个http服务对象
var server = http.createServer();
//3.监听用户的请求事件
server.on('request',function (req,res) {
    //解决乱码的思路：服务器通过响应报文头，告诉浏览器使用相应的编码来解析网页
    res.setHeader("Content-Type","text/html; charset=utf-8");
    res.write("hello <h1>world</h1>. 你好世界！zx");
    //对于每一个请求，服务器必须结束响应，否则客户端（浏览器）会一直等待服务器响应结束
    res.end();
});
//4.启动服务
server.listen(8080,function(){
   console.log('服务区启动了，请访问：http://locahost:8080');
});

