// pages/naturename-change/naturename-change.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    error: '',
    showError: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  changeInfo: function(e) {
    var naturename = e.detail.value.naturename
    console.log(naturename)
    var page = this
    wx.request({
      url: app.globalData.host + '/account/info',
      data: {
        token: app.globalData.userInfo.token,
        naturename: naturename,
      },
      method: 'POST',
      success: function(res) {
        console.log(res.data)
        if (res.statusCode != 200) {
          page.setData({
            error: res.data.message,
            showError: true,
          })
        } else {
          wx.navigateBack({
            delta: 1,
            success: function() {
              wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '网络错误',
          icon: 'loading',
          duration: 3000
        })
      }
    })
  },
})