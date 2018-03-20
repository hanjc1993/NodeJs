const http = require('http');
const fs = require('fs');

var server = http.createServer(function(req,res){
    var fileName = './www'+req.url
    console.log(fileName)
    fs.readFile(fileName,function(err,data){
        if(err){
            res.write('404')
        }else{
            res.write(data)
        }
        //res.end必须放在readfile里面。拿到外层就会先执行，因为是异步，不会等读完文件才执行
        res.end();
    });
})

server.listen(1234);