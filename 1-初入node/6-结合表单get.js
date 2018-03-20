const http = require('http');
const querystring = require('querystring')
//querystring 模块用于把字符串形式的json转换成标准形式
const urlLib = require('url')
//url 模块用于将url数据转换成各种东西，这里也可以用，消耗稍高，功能更强

http.createServer(function(req,res){
    console.log(req.url)
    let get = {}//用querystring 模块的方法来解析
    let get2 = {}//用url模块的方法来解析
    let arr = req.url.split('?')[1]
    get = querystring.parse(arr)
    //querystring.parse方法自带判断
/*    if(req.url.split('?') != -1){
        let arr = req.url.split('?')[1]
        get = querystring.parse(arr)
    }*/

    get2 = urlLib.parse(req.url,true)//第一个参数是地址，第二个意为‘是否把json转换为标准格式’

    console.log(get)
    console.log(get2)
    res.write('111aaa');
    res.end();
}).listen(2234)