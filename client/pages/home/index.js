//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    /*indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1200,*/
    markers: [{
      iconPath: "/resources/redPoint.png",
      id: 0,
      latitude: 40.0171964,
      longitude: 116.306633,
      width: 10,
      height: 10
    }],
    polyline: [{
      points: [{
        longitude: 116.306633,
        latitude: 40.0171964
      }, {
        longitude: 116.306633,
        latitude: 40.0171964
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }]
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  swiperchange: function (e) {
    //FIXME: 当前页码
    //console.log(e.detail.current)
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

  },
  go: function (event) {
    wx.navigateTo({
      url: '../list/index?type=' + event.currentTarget.dataset.type
    })
  }
})
