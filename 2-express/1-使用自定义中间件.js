const express = require('express');
const myBodyParser = require('./1-myBodyParser')

let server = express();
server.listen(2234)

server.use(myBodyParser.aaa())

server.use('/newModule',function (req,res) {
    console.log(req.body)
})