const jade = require('jade')
const fs = require('fs')

//jade里面写属性的方式是(xxx='xxxx')，和平常一样，就加了个括号。多个属性的话用逗号分隔
//内容的话在后面加个空格，然后加内容
//写大段代码的话，一般会有大量的空格无法识别，需要在每行的内容前加|竖线，叫原意标签，原封不动输出
    //更简单的方法是在标签后面加个点 . 表示这个标签内的所有内容均原样输出，特别适合script和style
    //另一种简单方法是用include 引入外部文件，这里不是html页面的引入，是渲染时的引入，性能仅次于直接写在页面内
//style可以使用属性的普通写法，也可以传入一个json，方便传递变量
//class可以使用属性的普通写法，也可以传入一个array，方便传递变量，第三种方法是简写，详见本例对应的.jade
//在标签名和属性括号中间加上&attributes，可以在属性括号里把所有属性都通过json传递
//允许自定义标签，均识别为双标签

//典型的先渲染再写入
let str = jade.renderFile('./view/2-html.jade',{
    pretty:true,
    name:'hjc',//对应模板中的name，引用此变量的方式是 #{name}
    json:{width:'200px',height:'200px',background:'red'}//对应上面的style写法
})

//doctype直接写在jade第一行即可，head中别忘了写meta(charset='utf-8')
fs.writeFile('./www/2-jade.html',str,function (err) {//文件可以不存在但目录必须存在
    if(err){
        console.log('写入失败',err)
    }else{
        console.log('写入成功')
    }
})
console.log(str)