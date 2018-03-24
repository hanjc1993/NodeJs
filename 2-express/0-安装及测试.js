const express = require('express');
//用到express-static模块，自己下，是fs增强版
const expressStatic = require('express-static')

//之前敲了不少字，神秘bug改不掉，删掉重来，之前的也懒得写了，是个.send的示例
var server = express();

var loginData={
    'zhangsan':'zhangsan',
    'lisi':'1234',
    'wanger':'lisi'
}
//只要是自定义处理，都用.get或者.post，如果是使用中间件（后面讲），则用.use
server.get('/login',function(req,res){
    console.log(req.query)
    let user = req.query.user;
    let pass = req.query.pass;

    if(loginData[user] == null){
        res.send({'ok':false,'msg':'用户不存在'})
    }else{
        if(loginData[user] == pass){
            res.send({'ok':true,'msg':'登陆成功'})
        }else {
            res.send({'ok':false,'msg':'密码错误'})
        }
    }
})
server.use(expressStatic('./www'))

server.listen(2234)