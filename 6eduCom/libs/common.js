const crypto=require('crypto');

module.exports={
    //在密码后面追加一段文字，可以使MD5极难被穷举破解
  MD5_SUFFIX: 'FDSW$t34tregt5tO&$(#RHuyoyiUYE*&OI$HRLuy87odlfh是个风格热腾腾)',
  md5: function (str){
      //使用md5签名加密法
    var obj=crypto.createHash('md5');
    //update可以用多次，也是强化加密的方法之一，这里不用了
      //按理是MD5_SUFFIX追加在str后面，本例在外部追加，以防忘记这回事
    obj.update(str);
    //digest表示转码，这里转成16进制
    return obj.digest('hex');
  }
};
