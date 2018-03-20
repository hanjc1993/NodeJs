const jade = require('jade');
const fs = require('fs');

//同一属性多次写入会自动叠加
//通过在代码前加减号 - 可以让jade内的代码可被执行且不被显示
//如果某标签中仅引用一个变量，可以直接让标签等于变量 如span=a
//可以在jade中使用for循环，if判断，switch判断，详见jade

let str = jade.renderFile('./view/3-html.jade',{
    pretty:true,
    arr :[113,123,4152,123421],
    //jade渲染过程中，会把标签转移成&lt; &gt;等，以防止注入攻击，通过把=换成!=即可实现直接输出标签
    //注入攻击通常通过Web表单提交或输入域名或页面请求的查询字符串，所以前端页面主要关注表单元素，其他的由后端防御
    content:'<h2>我是标题</h2><p>我是内容内容内容</p>'
})

fs.writeFile('./www/3-jade.html',str,function(err){
    if(err){console.log('写入错误',err)}else{console.log('写入成功')}
})

console.log(str)

//jade先学到这里，后面还会用到，jade缺点是强依赖，优点是写的比较舒服？（我觉得挺别扭。。）