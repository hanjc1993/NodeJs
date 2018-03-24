const express = require('express');
const common = require('../../libs/common');
const mysql = require('mysql');

var db = mysql.createPool({host: 'localhost', user: 'root', password: 'xixihaha', database: 'learn'});

module.exports = function () {
    var router = express.Router();
//使用本路由（/admin）的所有的get请求（）均渲染管理员登录的界面
    router.get('/', (req, res) => {
        res.render('admin/login.ejs', {});
    });
    router.post('/', (req, res) => {
        var username = req.body.username;
        //把收到的post中的密码进行md5签名，
        var password = common.md5(req.body.password + common.MD5_SUFFIX);

        db.query(`SELECT * FROM admin_table WHERE username='${username}'`, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('database error').end();
            } else {
                if (data.length == 0) {
                    res.status(400).send('用户名错误').end();
                } else {
                    //获取数据库中该用户名对应的密码， 的md5值，与输入的进行对比
                    if (data[0].password == password) {
                        //成功的话记录一个session
                        req.session['admin_id'] = data[0].ID;
                        //跳转到admin
                        res.redirect('/admin/');
                    } else {
                        res.status(400).send('密码错误').end();
                    }
                }
            }
        });
    });

    return router;
};
