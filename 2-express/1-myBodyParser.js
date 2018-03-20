const querystring = require('querystring')

//use 如果不传第一个参数，则对每一个访问都处理
module.exports = {
    aaa:function () {
        return function(req,res,next){
            let str = '';
            req.on('data',function (data) {
                str += data;
            })
            req.on('end',function () {
                req.body = querystring.parse(str);
                next();
            })
        }
    }
}

