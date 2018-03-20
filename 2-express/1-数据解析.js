const express = require('express')
const express_static = require('express-static');
//自己下个 body-parser中间件，据说不怎么好用，但这里先用这个
const bodyparser = require('body-parser')

const server = express();
server.listen(2234)

//只要是监听同一个操作，就是链式操作，链式操作必须写上next，才会执行下一个
server.use('/lianshi',function(req,res,next){
    console.log('a')
    //如果next前出错了，就不会继续
    next();
})
server.use('/lianshi',function(req,res,next){
    console.log('b')
})

//这里采用初级链式操作，先第一个use对数据进行处理，再用第二个use处理，bodyparser自动调用next()，可通常情况不同
server.use(bodyparser.urlencoded({
    //是否启用扩展模式，是的话键值对中的值不仅限于string或array形式
    extend: true,
    //指定数据大小限制，默认100k，写数字，单位是K
    limit: 2*1024//限制2M
}))
//如果没上一行，req.body就不存在
server.use('/login',function (req,res) {
    console.log('post数据',req.body)
    console.log('get数据',req.query)
})



