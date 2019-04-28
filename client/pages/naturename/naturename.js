const app = getApp()

Page({
  data: {
    appUserInfo: {},
    users: [],
  },
  // 页面显示时加载数据
  onShow: function() {
    var page = this
    // 获取缓存中的token
    const token = wx.getStorageSync('token')
    // token存在，获取用户信息
    if (token) {
      console.log('got token')
      this.getAppUserInfo(token)
    } else {
      
    }
    // 显示所有用户
    wx.request({
      url: app.globalData.host + '/account/list',
      success: function(res) {
        console.log(res.data)
        page.setData({
          users: res.data.result,
        })
      },
      fail: function() {
        wx.showToast({
          title: '网络错误',
          icon: 'loading',
          duration: 3000
        })
        console.log('获取列表失败')
      }
    })
  },
  login: function() {
    console.log("登录")
    // token不存在， 登录
    var page = this
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: app.globalData.host + '/account/token',
            data: {
              'js_code': res.code
            },
            success: function (res) {
              console.log(res.data)
              app.globalData.userInfo = res.data.result
              page.setData({
                appUserInfo: res.data.result,
              })
              wx.setStorageSync('token', res.data.result.token)
            },
            fail: function () {
              wx.showToast({
                title: '网络错误',
                icon: 'loading',
                duration: 3000
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
      fail: function (res) {
        console.log('登录接口调用失败！' + res.errMsg)
      }
    })
  },
  getAppUserInfo: function(token) {
    var page = this
    wx.request({
      url: app.globalData.host + '/account/info',
      data: {
        'token': token,
      },
      success: function(res) {
        console.log(res.data)
        // 获取成功
        if (res.statusCode == 200) {
          app.globalData.userInfo = res.data.result
          page.setData({
            appUserInfo: res.data.result,
          })
        } else if (res.statusCode == 401) {
          page.login()
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '网络错误',
          icon: 'loading',
          duration: 3000
        })
        console.log('获取信息失败')
      }
    })
  },
})