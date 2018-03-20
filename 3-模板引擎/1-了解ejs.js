//npm下载一个ejs
const  ejs = require('ejs')

ejs.renderFile('./view/1-html.ejs',{name:'hjc'},function(err,data){
    if(err){
        console.log('编译失败')
    }else{
        console.log(data)
    }
})