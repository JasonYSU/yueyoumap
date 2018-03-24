const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wxaa945103696951fe',

    // 微信小程序 App Secret
    appSecret: 'c2e7864436b7d1e464c63ec0beef7a48',

    //baidu API接口的账号信息
    baiduAppId : "10504850",
    baiduAppKey : "SGpZEsVplQ7YvUxz4hKSrQAi",
    baiduSecretKey : "7hsxjmzhX4dpt64d99fs0EynQCN6HQEl",

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: true,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: 'cl3.141592653',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-beijing',
        // Bucket 名称
        fileBucket: 'yueyoumap',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,//必填。微信客服消息通知 token
    wxMessageToken: 'abcdefgh',//可选。微信登录态有效期，默认 7200 秒（单位：秒）

    /*
    //服务器配置
    serverHost : '',// 必填。当前服务器的 hostname
   // tunnelServerUrl : '',// 必填。信道服务器地址
    tunnelSignatureKey : '',// 必填。信道服务签名密钥
    qcloudAppId :'',// 必填。腾讯云 AppId
    qcloudSecretId:'', // 必填。腾讯云 SecretId
    qcloudSecretKey :'',// 必填。腾讯云 SecretKey
    */
}

module.exports = CONF
