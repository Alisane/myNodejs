// 该模块负责对具体的业务进行处理
// 步骤：
// 1. 思考，该模块中要封装什么代码？
// 2. 思考，这些代码有用到外部的数据吗？如果用到了，是否需要通过参数将这些数据传递到当前模块中
// 3. 当前模块对外需要暴露的东西（module.exports的值）

// module.exports = {};

var fs = require('fs');
var path = require('path');
var querystring = require('querystring');
var config = require('./config.js');

// 处理请求 / 和 /index 的业务方法
module.exports.index = function(req, res) {
  // 1. 读取 data.json 文件中的数据，并将读取到的数据转换为 list 数组
  readNewsData(function(list) {
    // 2. 在服务器端使用模板引擎，将 list 中的数据和 index.html 文件中的内容结合 渲染给客户端
    res.render(path.join(__dirname, 'views', 'index.html'), { list: list });
  });
};
// 处理请求 /submit 的业务方法
module.exports.submit = function(req, res) {
  // 读取 submit.html 并返回
  res.render(path.join(__dirname, 'views', 'submit.html'));
};

// 处理请求 /item 的业务方法（显示新闻详情）
module.exports.item = function(req, res) {
  // 1. 获取当前用户请求的新闻的 id
  // 2. 读取 data.json 文件中的数据，根据 id 找到对应新闻
  readNewsData(function(list_news) {
    var model = null;
    // 循环 list_news 中的数据，找到和 id 值相等的数据
    for (var i = 0; i < list_news.length; i++) {

      // 判断集合中是否有与用户提交的 id 相等的新闻
      if (list_news[i].id.toString() === req.query.id) {
        // 如果找到了相等的新闻，则将其记录下来
        model = list_news[i];
        break;
      }
    }
    if (model) {
      // 3. 调用 res.render() 函数进行模板引擎的渲染
      res.render(path.join(config.viewPath, 'details.html'), { item: model });
    } else {
      res.end('No Such Item');
    }
  });
};

// 处理 get 方式添加新闻
module.exports.addGet = function(req, res) {
  // 1. 读取 data.json 文件的数据
  readNewsData(function(list) {
    // 2.
    // 在把 新闻 添加到 list 之前，为新闻增加一个 id 属性
    req.query.id = list.length;
    // 向数组对象 list 中 push 一条新闻
    list.push(req.query);

    // 3. 写入 data.json 文件
    writeNewsData(JSON.stringify(list), function() {
      // 重定向
      res.statusCode = 302;
      res.statusMessage = 'Found';
      res.setHeader('Location', '/');
      res.end();
    });
  });
};

// 处理 post 方式添加新闻
module.exports.addPost = function(req, res) {
  // 1. 读取 data.json
  readNewsData(function(list) {
    // 2. 读取用户post提交的数据
    postBodyData(req, function(postData) {

      // 3. 为用户提交的新闻增加一个 id 属性，并且把新闻对象 push 到list中
      postData.id = list.length;
      list.push(postData);

      // 4. 将新的 list 数组，在写入到 data.json 文件中
      writeNewsData(JSON.stringify(list), function() {
        // 重定向
        res.statusCode = 302;
        res.statusMessage = 'Found';
        res.setHeader('Location', '/');

        res.end();
      });
    });
  });
};

// 处理静态资源请求
module.exports.static = function(req, res) {
  // 如果用户请求是以 /resources 开头，并且是 get 请求，就认为用户是要请求静态资源
  // /resources/images/s.gif
  res.render(path.join(__dirname, req.url));
};

// 处理 404 错误请求
module.exports.handleErrors = function(req, res) {
  res.writeHead(404, 'Not Found', {
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.end('404, Page Not Found.');
};

// 封装一个读取 data.json 文件的函数
function readNewsData(callback) {

  fs.readFile(config.dataPath, 'utf8', function(err, data) {
    if (err && err.code !== 'ENOENT') {
      throw err;
    }
    var list = JSON.parse(data || '[]');

    // 通过调用回调函数 callback() 将读取到的数据 list，传递出去
    callback(list);
  });
}

// 封装一个写入 data.json 文件的函数
function writeNewsData(data, callback) {

  fs.writeFile(config.dataPath, data, function(err) {
    if (err) {
      throw err;
    }
    // 调用 callback() 来执行当写入数据完毕后的操作
    callback();
  });
}

// 封装一个获取用户 post 提交的数据的方法
function postBodyData(req, callback) {
  var array = [];

  req.on('data', function(chunk) {
    array.push(chunk);
  });
  // 监听 request 对象的 end 事件
  // 当 end 事件被触发的时候，表示上所有数据都已经提交完毕了
  req.on('end', function() {

    var postBody = Buffer.concat(array);
    // 把 获取到的 buffer 对象转换为一个字符串
    postBody = postBody.toString('utf8');

    // 把 post 请求的查询字符串，转换为一个 json 对象
    postBody = querystring.parse(postBody);

    // 把用户 post 提交过来的数据传递出去
    callback(postBody);
  });
}