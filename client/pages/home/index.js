Page({
  /**
   * 页面的初始数据
   */
  data: {
    latitude: 40.0251292215,
    longitude: 116.3504880667,
    markers: [
      {
        id: 0,
        iconPath: "../../resources/广济桥.png",
        latitude: 40.0251292215,
        longitude: 116.3504880667,
        callout: {
          content: " 清河广济桥",
          padding: 5,
          color: "#ff0000",
          bgColor: "#ffff00",
          display: 'ALWAYS',
          textAlign: 'center',
          borderRadius: 10,
          borderColor: '#ffffff',
          borderWidth: 2,
        }

      },
      {
        id: 1,
        latitude: 40.0269161215,
        longitude: 116.3465076685,
        callout: {
          content: "清河清真寺",
          padding: 5,
          color: "#ff0000",
          bgColor: "#ffff00",
          display: 'ALWAYS',
          textAlign: 'center',
          borderRadius: 10,
          borderColor: '#ffffff',
          borderWidth: 2,
        }

      },
      {
        id: 2,
        latitude: 40.0283538231,
        longitude: 116.3341212273,
        callout: {
          content: "清河制呢厂办公楼",
          padding: 5,
          color: "#ff0000",
          bgColor: "#ffff00",
          display: 'ALWAYS',
          textAlign: 'center',
          borderRadius: 10,
          borderColor: '#ffffff',
          borderWidth: 2,
        }

      },
      {
        id: 3,
        latitude: 40.0277171304,
        longitude: 116.3236445189,
        callout: {
          content: "清河古汉城遗址",
          padding: 5,
          color: "#ff0000",
          bgColor: "#ffff00",
          display: 'ALWAYS',
          textAlign: 'center',
          borderRadius: 10,
          borderColor: '#ffffff',
          borderWidth: 2,
        }

      },
    ],
    mapWidth: '',
    mapHeight: ''

  },
  toaddress: function (e) {
    console.log(e)
    var id = e.markerId
    console.log(id)
    // wx.openLocation({
    //   latitude: this.data.markers[id].latitude,
    //   longitude: this.data.markers[id].longitude,
    // })
    wx.navigateTo({
      url: '/pages/index/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sy = wx.getSystemInfoSync(),
      mapWidth = sy.windowWidth * 2,
      mapHeight = sy.windowHeight * 2;
    this.setData({
      mapWidth: mapWidth,
      mapHeight: mapHeight
    })
  }
})