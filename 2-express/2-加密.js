//如果要给cookie加密，可以使用cookie-encryper模块，在官网上查，但安全性偏低，不推荐使用。他可以让用户看不到数据
//这里推荐给session加密，使用cookie-session中间件
//session其实也是cookie，所以必须有cookie相关的东西作为前置内容
const express = require('express')
const cookieparser = require('cookie-parser')
const cookiesession = require('cookie-session')

let server = express();
server.listen(2234);

let arr = [];
for(let i=0 ; i<10000 ; i++){
    arr.push('sig_'+Math.random())
}

server.use(cookieparser('fasdgha'));
//必须先解析cookie，所以放在parser后面
server.use(cookiesession({
    name:'mySession',//就是名字而已
    keys : arr,//session必须有一个keys值，这些值将循环作为加密值，理论上越多越难破解。通过上面的循环赋值可以大大提高安全性
    maxAge:1800*1000//有效期，单位毫秒，一小时内较好，否则占用服务器资源。
    // 一般是用户登录后账号密码存在session中，每次敏感操作均验证session中的值，如果对了则重置其有效期，等session失效了，则只能重新登录
}))

server.use('/cookie/cookieT.html',function (req,res) {
/*    if(!req.cookies.user && !req.signedCookies.user){
        res.cookie('user','hjc',{
            path:'/cookie',
            maxAge: 30*24*3600*1000,
            signed:true
        })
        console.log('已执行添加cookie')
    }else{
        res.clearCookie('user',{path:'/cookie'});
        console.log('已执行删除cookie')
    }*/

//session和cookie可以共存，这里就不演示了
    if(req.session.count == undefined){
        req.session.count = 1
    }else{req.session.count++}
    console.log(req.session.count)

    //res.session并不存在，因为他本身是放在服务器上的，
    //删除的话 用deleta req.session，能用delete是因为session存在于服务器端
    res.send('ok')
    //如果没有任何返回的内容，session的识别信息及cookie将不会被发送到客户端
})