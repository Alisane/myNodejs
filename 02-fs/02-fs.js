// 文件写入操作
var fs = require('fs');
console.log("000");
var msg = 'Hello World! ';

fs.writeFile('boot.txt',msg,'utf-8',function(err) {
    if(err){
        console.log("写文件出错了!"+err);
    }
    else{
        console.log("ok");
    }
});
console.log("111");

// 文件读取操作
var fs = require("fs");
// data参数的数据类型是一个buffer对象（字节数组），把buffer对象转换为字符串
var msg = fs.readFile("boot.txt",'utf-8',function (err,data) {
    if(err) {
        throw err;
    } else {
        console.log(data.toString());
    }
});