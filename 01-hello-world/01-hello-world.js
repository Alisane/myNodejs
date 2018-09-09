
var x = 10;
var y = 20;
function add(x,y) {
    return x+y;
}
var result = add(x,y);
console.log('计算结果是：' + result);
console.log('hello world!');

for (var i = 0;i < 10;i++) {
    for(var j = 0;j <= i;j++){
        process.stdout.write('*');
    }
    // 换行
    console.log();
}

// process模块是全局模块不需要用require('')函数来加载模块,可以直接使用。
// fs模块不是全局模块需要用require()函数来加载模块，方可使用。
// var fs=require('fs');
