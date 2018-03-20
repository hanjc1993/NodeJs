//require , module , exports

const mod1 = require('./9-module');// .js后缀可写可不写
//如果引入是系统模块，则不需要./  ，如果是自定义模块，必须加上./前缀
//替代方案是， 把这个module文件放到node_modules文件里，此时自定义模块变为--自定义系统模块
//系统模块的优先级高于自定义模块
console.log(mod1.a,mod1.b)

//npm ： nodejs package management包管理器
//是nodejs 的统一下载渠道
//会自动下载这个包所依赖的相关文件
//都说中国的npm比较慢，我用了下感觉还挺快
//常用的有 install uninstall


//www.npm.org是npm的官网，上面可以找到nodejs相关的大量模块
//自定义包的 发布方法 详见   https://www.bilibili.com/video/av12300358/?from=search&seid=2196039073423452603#page=8