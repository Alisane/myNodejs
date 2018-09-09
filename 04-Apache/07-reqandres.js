/*request(http.IncomingMessage):
服务器解析用户提交的http请求报文，
将结果解析到request对象中，
凡是要获取和用户请求相关的数据都可以通过request对象获取
*/
// var http=require("http");
// http.createServer(function (req,res) {
//    /* request.headers
//     request.rawHeaders
//     request.httpVersion
//     request.method
//     request.url*/
//     //1.获取所有请求头,返回的是一个对象，这个对象中包含了所有的请求报文头
//     // console.log(req.headers);
//     //2.获取所有请求头,返回的是一个数组，这个数组中包含了所有的请求报文头中的字符串
//     //console.log(req.rawHeaders);
//     //3.获取客户端所使用的http版本
//     //console.log(req.httpVersion);
//     //4.获取客户端所使用的请求方法
//     //console.log(req.method);
//     //5.获取客户端所请求的路径    /
//     console.log(req.url);
//     res.end("over");
// }).listen(9091,function () {
//     console.log('http://localhost:9091')
// });


/*response:(http.ServerResponse):在服务器端用来向用户（客户端）
响应的操作，都需要通过response对象来进行。*/
var http = require("http");
http.createServer(function (req,res) {
    //1.res.wirte()
    //2.res.setHeader()设置响应报文头
    //3.res.statusCode设置http响应状态码
    //4.res.statusMessage设置http响应状态码对应的消息
    // res.setHeader("Content-Type","text/plain;charset=utf-8");
    // res.statusCode=404;
    // res.statusMessage='not found!';
    //6.该方法直接将这些信息写到响应报文头中
    res.writeHead(200,'ok',{
        "Content-Type":"text/plain;charset=utf-8"
    })
    res.write("hello world! 你好世界！");
    res.write("hello world! 你好世界！");
    res.write("hello world! 你好世界！");
    //5. res.end()响应完毕
    res.end("over");
}).listen(9091,function () {
    console.log('http://localhost:9091')
});