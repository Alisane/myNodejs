//服务器想让浏览器跳转到那个页面，设置响应头
// 当前项目（包） 的入口文件
//封装一个render()函数
//将render函数挂到res对象上，可以通过res.render()来访问
//实现get方式添加新闻
// 1. 加载 http 模块
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var url = require('url');
// 2. 创建服务
http.createServer(function (req, res) {
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
    }
    // 将用户请求的url 和 method 转换为小写字母
    req.url = req.url.toLowerCase();
    req.method = req.method.toLowerCase();

    //通过url模块，调用url.parse()返回的是一个对象，该方法解析用户请求的url（req.url）
    var urlObj=url.parse(req.url,true);
        console.log(urlObj);
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
    } else if (req.url.startsWith( '/add') && req.method === 'get') {
        // 表示 get 方法提交一条新闻
        //1.拿到用户提交的数据 用到url内置模块
        //用户用get方式提交数据，可以用req.url得到路径，用起来不方便，要自己截取字符串
        //用url内置模块，可以将提交的数据解析为一个json对象，用起来方便
        // console.log(req.url);
        // res.end("over");
        //2.把用户提交的新闻数据保存到data.json文件中
        var list=[];
        list.push(urlObj.query);
        //2.1把list数组中的数据写入到data.json文件中,JSON.stringify()将json格式的数组转化为字符串
        fs.writeFile(path.join(__dirname,"data","data.json"),JSON.stringify(list),function (err) {
            if(err){
                throw err;
            }
            console.log("ok");
            //要设置响应报文头，通过响应报文头，执行一次页面跳转
            //3.跳转  重定向
            res.statusCode=302;
            res.statusMassage='Found';
            res.setHeader('Location','/');
            res.end();
        });
        //2.保存用户的数据
        //3.跳转到新闻列表页
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