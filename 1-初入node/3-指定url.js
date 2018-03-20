const http = require('http');
var server = http.createServer(function(req,res){
    //console.log(req.url)
    switch(req.url){
        case '/1.html':
            res.write('1111');
            break;
        case '/2.html':
            res.write('22222');
            break;
        default :
            res.write('nothing')
            break;
    }
    res.end();
    //此时打开http://localhost:1234/3.html将返回nothing，其他一样
});
server.listen(1234)
