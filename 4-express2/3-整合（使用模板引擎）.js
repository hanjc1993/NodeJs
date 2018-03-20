const express = require('express')
const static = require('express-static')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const multer = require('multer')
//consolidate的作用是将模板引擎转换成统一的接口，输出给express，用了它之后，就不用再用jade，ejs等
const consolidate = require('consolidate')
// const jade = require('jade')
// const ejs = require('ejs')

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
    name:'mySession1',
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
//配置模板引擎：
// 输出什么格式的数据，第一个参数强制为这个，第二个填你想要的
server.set('view engine','html')
// 模板文件放在哪，第一个参数强制为这个，第二个填你想要的
server.set('views','./views')
// 使用哪种模板引擎，第一个参数填想要输出的格式，第二个参数后缀填你想识别的模板种类，比如这里想识别ejs
server.engine('html',consolidate.ejs)

//模板整合的方法十分方便，
server.use('/2-zhenghe.html',function (req,res) {
    if(req.session.userId){
        res.render('3-整合.ejs',{name:'hjc'})
    }else{
        req.session.userId = 'user'
        res.render('2-welcome.ejs')
        console.log(req.session)
    }
})
//static数据
server.use(static('./www'))