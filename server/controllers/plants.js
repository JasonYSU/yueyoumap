/*
接收客户端传过来的图片信息
调用百度云的识别植物的接口API
返回植物信息和可靠性信息
*/
const config = require('../config')
var fs = require('fs')
/*
const { uploader } = require('../qcloud')

module.exports = async ctx => {
  // 获取上传之后的结果
  // 具体可以查看：
  const data = await uploader(ctx.req)

 ctx.state.data = data
}*/
module.exports = ctx => {
/*
var AipImageClassifyClient = require('baidu-aip-sdk').imageClassify
var client = new AipImageClassifyClient(config.baiduAppId,config.baiduAppKey,config.baiduSecretKey)

//
//如何得到上传图片地址？
 var image = fs.readFileSync("./joyrun.png").toString("base64")
  //http://p0pdtu7st.bkt.clouddn.com/yueyoumap/plants兰花.jpeg

  // 调用植物识别
  client.plantDetect(image).then(function (result) {
  console.log(JSON.stringify(result))
    }).catch(function (err) {
  // 如果发生网络错误
      console.log(err);
      })
*/
  ctx.state.data = {
    //返回植物信息 
    msg: "OK 123"
    //JSON.stringify("ok 123")
    //
    //fs.readFileSync("../sever/baiduyun/flower.jpeg").toString("base64")
    //result[1].name
  }
}
