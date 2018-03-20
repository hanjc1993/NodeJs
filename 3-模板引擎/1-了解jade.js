//先用npm下一个jade
const jade = require('jade')

//可以直接这么写，返回<html></html>，但建议新建个外部文件，加载进来
//let str = jade.render('html');

//第二个参数中的pretty是给人用的，给机器看的话根本不需要
//.jade文件，根据缩进来决定级别
let str = jade.renderFile('./view/1-html.jade',{pretty:true})
console.log(str)