//router是把不同的目录对应到不同的模块及子模块等，目的是拆分（多人合作）简化服务器js文件
//router相当于是一个 子服务器，和服务器具备相同的基本功能，但仅在访问指定目录时生效
const express = require('express')

let server = express();
//目录1：/user/
//首先使用express.router创建
let routeUser = express.Router();
//设置不同目录的操作
routeUser.get('/1.html',function (req,res) {//访问http://xxx.com/user/1.html
    res.send('user1')
})
routeUser.get('/2.html',function (req,res) {//访问http://xxx.com/user/2.html
    res.send('user222222')
})
//把route添加到server中去，在访问/user时生效
server.use('/user',routeUser)


//目录2：/article/
let routeArticle = express.Router();
//先后顺序不强制
//如果是二级router，则不添加到server，添加到一级router即可
//一级的router必须用use
server.use('/article',routeArticle)
routeArticle.get('/1.html',function (req,res) {
    res.send('article111')
})
routeArticle.get('/2.html',function (req,res) {
    res.send('article2222')
})


server.listen(2234)