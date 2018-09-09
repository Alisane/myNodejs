//读写文件的路径问题
var fs = require("fs");
var path = require("path");
//path.join路径自动拼接
var filename = path.join(__dirname , 'boot.txt');
console.log(__filename);
fs.readFile(filename,"utf-8",function (err,data) {
    if(err){
        throw err;
    }
    console.log(data);
});
console.log(__dirname);
console.log(__filename);