//npm下一个，node里面的mysql相当于客户端，需要与服务器端的mysql进行连接
const mysql = require('mysql');

//先连接，在查询（发送请求）

//连接，（服务器地址，端口号，用户名，密码，哪个库）
let db = mysql.createConnection({
//port：3306   默认就是这个
    host:'localhost',
    user:'root',
    password:'xixihaha',
    database:'180320'
})
//console.log(db)//挺多东西的可以看一眼
//查询：query（操作是什么，回调函数），凡是异步操作都要回调
db.query('SELECT * FROM `user_table`;',(err,data) =>{
    if(err){console.log(err)}
    else{
        //这个数据经过JSON.stringify(data)的处理后，可以直接传输到前台解析
        console.log('成功了',JSON.stringify(data))
    }

})