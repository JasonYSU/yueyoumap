// pages/history/history.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    histories: [
      {
        ID: 1,
        name: "清河广济桥（老桥）",
        picture: 'http://pqrsdufs6.bkt.clouddn.com/广济桥1.jpg'
        //wx:for-items = {{birds.sound}}     
      },
      {
        ID: 2,
        name: "清河清真寺（老寺）",
        picture: 'http://pqrsdufs6.bkt.clouddn.com/清河清真寺.jpg'
      },
      {
        ID: 3,
        name: "清河制呢厂办公楼（老厂）",
        picture: 'http://pqrsdufs6.bkt.clouddn.com/制呢厂办公楼.jpg'
      },
      {
        ID: 4,
        name: "清河古城遗址（老城）",
        picture: 'http://pqrsdufs6.bkt.clouddn.com/清河汉城遗址.jpg'
        //wx:for-items = {{birds.sound}}
      },
      {
        ID: 5,
        name: "清河火车站站房（老站）",
        picture: ''
      },
      {
        ID: 6,
        name: "安宁庄兴隆寺（老庙）",
        picture: ''  
        },
      {
        ID: 7,
        name: "仓营宝顶",
        picture: ''
      },
    ]

  },
  viewDetail: function (e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: ds.sound
    })
  },
  onReady: function () {},
  /**
   * 生命周期函数--监听页面加载
   */
  /*
  onLoad: function (options) {

    wx.request({
      url: 'test.php', //仅为示例，并非真实的接口地址
      data: {
       image:""
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },*/
  //include using in it include
  //image :"www.yueyoumap.com"
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})