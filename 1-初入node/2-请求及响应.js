//先启用http模块
const http = require('http');
//再创建服务器
var server = http.createServer(function(request,response){
    //两个参数分别是请求和响应
    //response有两个方法
    //write将直接往html中写内容，（如果没有接收的话）
    response.write('哈哈哈');
    //end将告诉访问者，本次响应已经结束
    response.end();
});
//再创建监听端口，加入监听端口
server.listen(1234)
//此时运行服务器，然后在浏览器打开localhost:1234
//访问一次，在WS中及记录一次‘有人访问’