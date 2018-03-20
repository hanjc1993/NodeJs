//nodejs里面没有全局变量
//模块想输出内容，必须通过exports
exports.a = 12;
//当要输出的东西比较多的时候 ，使用module.exports = {xxxx}
//这里故意写重复了，说明module.exports优先级最高
module.exports = {a:11,b:123,c:1234}
exports.a = 13;

