//做个用户登录
const http = require('http');
const urlLib = require('url');
const fs = require('fs');
const querystring = require('querystring');

let users = {}//正常是吧用户数据放在数据库中，或者放在文件中，这里先放在对象中（关了服务器就消失了）

var server = http.createServer(function(req,res){
    //先解析数据
    let str = '';
    req.on('data',function(data){
        str += data;
    })
    req.on('end',function () {
        let obj = urlLib.parse(req.url,true)
        const url = obj.pathname
        const GET = obj.query;
        console.log('GET:',GET)
        const POST = querystring.parse(str)
        //先识别前台是请求接口还是文件
        if(url == '/user'){//目前只有这一个接口
            switch(GET.act){
                case 'reg'://当时注册的时候
                    //先检查用户名是否存在
                    //将数据插入到存储中
                    if(users[GET.user]){
                        res.write("{'ok':false,'msg':'这个用户名已经被占用了'}")
                    }else{
                        //这里懒得判断密码格式了，直接插入到users对象中
                        users[GET.user] = GET.pass
                        res.write("{'ok':true,'msg':'用户注册成功！'}")
                    }
                    break;
                case 'login'://当时登录的时候
                    //先检查用户名是否存在
                    if(users[GET.user] == null){
                        res.write("{'ok':false,'msg':'此用户不存在'}")
                    }else{
                        if(users[GET.user] == GET.pass){
                            res.write("{'ok':true,'msg':'登录成功！'}")
                        }else{
                            res.write("{'ok':false,'msg':'密码错误'}")
                        }
                    }
                    //检查用户密码是否正确
                    break;
                default :
                    res.write("{'ok':false,'msg':'未知的act数据'}")
            }
            res.end();
            console.log(users)
        }else{
            //读取文件
            let fileName = './www'+url;
            console.log(fileName)
            fs.readFile(fileName,function (err,data) {
                if(err){
                    res.write('404');
                }else{
                    res.write(data)
                }
                res.end()
            })
        }
    })

})

server.listen(2234)