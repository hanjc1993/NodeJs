const ejs = require('ejs');
const fs = require('fs')

//ejs的<%= xxx %>中，xxx可以是各种变量，及其属性
//<%= xxx %>是带转义的，和jade一样防注入。把等号换成减号，就变成原义输出<%- xxx %>，见ejs
//<%= include ./xxx.x %>是引入外部文件，不带转义，见ejs
//ejs中可以使用for循环，详见ejs
var str1;
ejs.renderFile('./view/4-html.ejs',{
    name:'hjc'
},function(err,data){
    if(err){console.log('渲染错误',err)}
    else{console.log(data);str1 = data}
})

fs.writeFile('./www/4-ejs.html',str1,function (err) {
    if (err){console.log('写入失败')}
    else{console.log('写入成功')}
})