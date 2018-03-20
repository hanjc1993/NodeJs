const http = require('http');
const express = require('express')

let server = express();
server.listen(2234);

server.use('/test',function(req,res){
    res.send("gettest({'test':'data'})")
    console.log(req.query)
})