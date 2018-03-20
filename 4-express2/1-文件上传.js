const express=require('express')
const bodyParser = require('body-parser')
//要想读取上传的文件，必须用到multer这个组件
const multer = require('multer')
//上传上来的文件名字是乱的，可以防止重名，但没有后缀是不行的，需要用fs来修改
const fs = require('fs')
//path模块解析原始文件名中的后缀，通过fs追较到服务器新建的文件的名字后面
const path = require('path')

let server = express();
let objMuter = multer({//要想用multer必须先创建一个对象
    dest:'./upload',//此选项设置了文件的服务器接收目录
    //如果没有此选项，上传的文件均保存在内存中，当文件很大时，即使用writefile写入磁盘也得等全上传完才行。
});

server.use(bodyParser.urlencoded({
    extended:true
}))

//server.use(multer()); //multer不能像普通中间件一样直接引用，得处理对象
//.any表示接受任何文件，.single('xxx')表示只接受名字为xxx的文件，any有一点风险(无法控制上传个数？)
server.use(objMuter.any())

server.post('/',function (req,res) {
    //测试时发现发送过的文件识别为空对象
    //console.log(req.body)     //.body中存放的也仅限于数据信息
    console.log(req.files)//得用.files 读取解码后的文件信息
    //.files中有很多属性，fieldname表单name，originalName真实文件名，encoding编码格式，mimetype文件类型（会畸变？）
    // buffer文件内容，size文件大小（字节），fileName服务器端文件名，path服务器端存储路径


    let kuozhanming = path.parse(req.files[0].originalname).ext
    let oldName = req.files[0].path
    let newName = req.files[0].path + kuozhanming
    console.log(oldName,newName)
    fs.rename(oldName,newName,function (err) {
        if(err){console.log('重命名错误',err)}
    })
})

server.listen(2234)