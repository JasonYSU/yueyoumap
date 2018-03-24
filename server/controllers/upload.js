/*
const { uploader } = require('../qcloud')

module.exports = async ctx => {
  await uploader(ctx.req).then(data => {
    console.log(data)
    // {
    //   imgUrl: 'http://test-121000000.cosgz.myqcloud.com/abcdef.jpg',
    //   size: 1024,
    //   mimeType: 'image/jpeg',
    //   name: 'abcdef.jpg'
    // }
  })
}
*/

const { uploader } = require('../qcloud')
module.exports = async ctx => {
  // 获取上传之后的结果
  // 具体可以查看：
  const data = await uploader(ctx.req)
  ctx.state.data = data
}