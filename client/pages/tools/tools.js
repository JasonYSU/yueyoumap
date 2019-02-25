// pages/tools/tools.js
const MENUS = [{
  name: '听鸟鸣识鸟',
  url: '/pages/tools-birds/birds',
  style: 'background-color: #E8D3A9;'
},
{
  name: '拍照识植物',
  url: '/pages/tools-plants/plants',
  style: 'background-color: #E8D3A9;'
},
{
  name: '经纬度和海拔查询',
  url: '/pages/tools-latitude/latitude',
  style: 'background-color: #D3D5B0;'
},
{
  name: '历史人文',
  url: '/pages/tools-history/history',
  style: 'background-color: #D3D5B0;'
},
{
  name: '更多功能正在开发中',
  url: '',
  style: 'background-color: #9DC9AC;'
}
];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus: MENUS
  },

  /**
   * 监听用户分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '我发现一个有用的户外工具集',
      path: '/pages/tools/tools'
    }
  }
})