const app = getApp();

Page({
  data: {
    image: "",
    count: 0,
  },
  onShareAppMessage: function() {
    return {
      title: '植物识别小程序',
      path: '/pages/plants/plants',
      success: function(res) {
        if (res.errMsg == 'shareAppMessage:ok') {
          wx.showToast({
            title: '分享成功',
            icon: 'success',
            duration: 500
          });
        }
      },
      fail: function(res) {
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          wx.showToast({
            title: '分享取消',
            icon: 'loading',
            duration: 500
          })
        }
      }
    }
  },
  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({
          image: res.tempFilePaths[0],
          count: 1,
        });
      }
    })
  },
  uploads: function() {
    var that = this
    if (this.data.count <= 0) {
      wx.showModal({
        title: '提示',
        content: '请先选择图片',
        showCancel: false,
        confirmText: '确认',
      });
    } else {
      wx.uploadFile({
        url: app.globalData.host + '/tools/recognize',
        filePath: that.data.image,
        header: {
          'content-type': 'multipart/form-data'
        },
        name: 'image',
        success: function(res) {
          if (res.statusCode == 200) {
            res = JSON.parse(res.data)
            wx.showModal({
              title: '识别结果',
              content: res.result.name,
              showCancel: false,
              confirmText: '我知道了',
              success: function() {
                that.setData({
                  count: 0,
                })
              }
            });
          } else {
            wx.showModal({
              title: '提示',
              content: '服务器错误',
              showCancel: false,
              confirmText: '确认',
              success: function () {
                that.setData({
                  count: 0,
                })
              }
            });
          }
        },
        fail: function(res) {
          wx.showModal({
            title: '识别结果',
            content: '上传图片失败',
            showCancel: false,
            confirmText: '确认',
            success: function () {
              that.setData({
                count: 0,
              })
            }
          });
        }
      });
    }
  },
});