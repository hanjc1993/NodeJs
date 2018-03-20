//http访问不能识别用户的身份，同一ip可能是很多人
//cookie保存在客户端，用于保存用户相关信息，但他是不安全的且大小有限（4K），因为用户可以自行修改本机cookie
//session保存在服务器端，作用和cookie一样，更安全大小无限制。
//但session是基于cookie实现的，cookie中会有一个sessionID，首次访问后服务器配置给客户端，再次访问时根据cookie中的sessionID分配内容
//而这个ID因为在cookie中，所以也是不安全的，但有些方法来缓解

//先测试cookie，发送和解析
//读取使用cookie-parser中间件
//cookie 是从根目录一直往下找的，其所在位置及其祖先目录均可访问到此cookie
const express = require('express')
const cookieparser = require('cookie-parser')

let server = express();
server.listen(2234);

//解析客户端发来的cookie
//cookie 的空间很小，不要每个都签名
server.use(cookieparser('fasdgha'));//参数是签名，必须跟下面的值一模一样才能解析

//给客户端发送cookie
server.use('/cookie/cookieT.html',function (req,res) {
    req.secret = 'fasdgha'//胡乱写一个，对应下面的签名，注意是加在req上的
    if(!req.cookies.user && !req.signedCookies.user){//已签名和未签名的cookie是两个东西
        res.cookie('user','hjc',{
            path:'/cookie',//指定了path之后，只有在该路径下才能访问cookie
            maxAge: 30*24*3600*1000,//单位是毫秒
            signed:true//是否设置签名，签名只能假装加密一下，最主要是能够识别用户是否修改过
        })
        console.log('已执行添加cookie')
    }else{//这里测试cookie的删除功能
        res.clearCookie('user',{path:'/cookie'});//如果不写目录，只能在根目录中查找。。坑了我一把
        console.log('已执行删除cookie')
    }

    res.send('ok')
})