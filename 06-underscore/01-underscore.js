var _=require('underscore');
//演示：
var names=['张三','香香','小明'];
var ages=[18,19,20];
//压缩
var result=_.zip(names,ages);
console.log(result);
//解压
result=_.unzip(result);
console.log(result);

//dome2:
var _=require('underscore');
//声明了一段代码模板代码的html文档
var html='<h2><%= name %></h2>';
//template()函数的返回值依然是一个函数
var fn=_.template(html);
html=fn({name:"哒哒"});
console.log(html);
console.log(fn.toString());


