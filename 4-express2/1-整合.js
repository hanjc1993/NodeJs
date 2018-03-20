const express = require('express')
const static = require('express-static')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
//讲下bodyParser的缺点，不能处理post文件上传，只能处理post用户数据
//这里专门在1-文件上传.js中解释服务器文件上传的问题
const bodyParser = require('body-parser')
//一般来说bodyparser和multer（只处理文件）是一起用的，分工明确
const multer = require('multer')
const jade = require('jade')
const ejs = require('ejs')

let server = express();

server.listen(2234);

//使用cookie
server.use(cookieParser('312sdfa'))
//使用session
let arr = [];
for(let i=0;i<10000;i++){
    arr.push('keys_'+Math.random())
}
server.use(cookieSession({
    name:'mySession',
    keys:arr,
    maxAge:1800*1000
}))
//解析post普通数据
server.use(bodyParser.urlencoded({extended:false}))
//解析post 文件数据
server.use(multer({dest:'./upload'}).any())

//处理用户请求
server.use('/',function(req,res,next){
    console.log(req.query)//get数据
    console.log(req.body)//post普通数据
    console.log(req.files)//post文件数据
    console.log(req.cookie)//cookie数据
    console.log(req.session)//session数据
    next();
})
//static数据
server.use(static('./www'))