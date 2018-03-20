//启用fs模块
const fs = require('fs');
//fs有两个方法
//readfile(文件名，回调函数)
fs.readFile('aaa.txt',function(err,data){
    //返回的data是二进制格式
    console.log(data.toString())
});

//writefile
fs.writeFile('bbb.txt','asdfasdfdsga',function(err){
     //只要运行就出现了bbb.txt及其内容
})