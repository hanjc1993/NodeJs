//get最大32k的数据，post最大1GB
//post 传输的时候是分段发送的，每段数据都会触发data事件，所有段都发完后触发end事件
const http = require('http');
const urlLib = require('url')
//url 模块对post 来的数据无法解析，这时候必须用querystring
const querystring = require('querystring')


http.createServer(function(req,res){
    let str = ''//接收数据
    let i = 0
    req.on('data',function(data){
        console.log(`这是第${i++}次`)
        str += data
    })
    req.on('end',function(){
        let post = querystring.parse(str)
        console.log(post)
    })
}).listen(1234)