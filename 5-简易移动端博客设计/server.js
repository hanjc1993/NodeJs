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
const mysql = require('mysql')

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
/*    console.log(req.query)//get数据
    console.log(req.body)//post普通数据
    console.log(req.files)//post文件数据
    console.log(req.cookie)//cookie数据
    console.log(req.session)//session数据*/
    next();
})
//配置模板引擎：
// 输出什么格式的数据，第一个参数强制为这个，第二个填你想要的
server.set('view engine','html')
// 模板文件放在哪，第一个参数强制为这个，第二个填你想要的
server.set('views','./views')
// 使用哪种模板引擎，第一个参数填想要输出的格式，第二个参数后缀填你想识别的模板种类，比如这里想识别ejs
server.engine('html',consolidate.ejs)

//let db = mysql.createConnection({
//这里为了避免频繁访问数据库，把数据库拿到外面
// 并且使用createPool代替createConnection，以便于多个访问可以同时进行
//建议声明在最前面，这里是为了表现，放在.get('/')中会频繁访问数据库
const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'xixihaha',
    database:'blog-test'
})

//模板整合的方法十分方便，
server.get('/',function (req,res,next) {
    db.query('SELECT * FROM banner_table',function (err,data) {
        if(err){res.send('错误',err).end();}
        else {
            res.banners = data;//以便后面使用这个数据
            next();
        }

    })
})
server.get('/',function (req,res,next) {
    db.query('SELECT title,summary FROM article_table',function (err,data) {
        if(err){res.send('错误',err).end()}
        else {
            res.articles = data;//以便后面使用这个数据
            next();
        }
    })
})
server.get('/',function(req,res){
    console.log(res.articles)

    res.render('index.ejs',{articles:res.articles,banners:res.banners})
})
//static数据
server.use(static('./www'))