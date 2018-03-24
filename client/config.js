/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://j1vgnosw.qcloud.la';
//'https://485889659.yueyoumap.com'; 

var config = {

  // 下面的地址配合云端 Demo 工作
  service: {
    host,

    // 登录地址，用于建立会话
    loginUrl: `${host}/weapp/login`,

    // 测试的请求地址，用于测试会话
    requestUrl: `${host}/weapp/user`,

    // 测试的信道服务地址
    tunnelUrl: `${host}/weapp/tunnel`,

    // 上传图片接口
    uploadUrl: `${host}/weapp/upload`,

    //下载图片接口
    downloadUrl: `${host}/weapp/download`,

    //返回植物信息接口
    plantsUrl: `${host}/weapp/plants`,

    //baidu的植物识别接口
    BaiduPlantsUrl: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant'

  }
};

module.exports = config;
