//先启用http模块
const http = require('http');
//再创建服务器
var server = http.createServer(function(){
    console.log('有人访问')
});
//再创建监听端口，加入监听端口
server.listen(1234)
//此时运行服务器，然后在浏览器打开localhost:1234
//访问一次，在WS中及记录一次‘有人访问’